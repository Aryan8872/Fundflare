import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';
import Stripe from 'stripe';
import * as donationService from '../services/donationService.js';
import catchAsync from '../utils/catchAsync.js';
import logger, { logUserActivity } from '../utils/logger.js';
import { donationSchema } from '../validation/donationValidation.js';
const stripe = new Stripe('sk_test_51RooXv5hlGq5vdMY5JdNvSjBtFkL1VquMlFoOwTSC5SwmM318RXKWXSmjqY0DPJ8ajNv4u342u1bTarMbFDpen9700q9jJH8Ei');
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';
const prisma = new PrismaClient();

export const createDonation = catchAsync(async (req, res) => {
    logger.info(`[createDonation] Request body: ${JSON.stringify(req.body)} user: ${req.user?.id || 'guest'}`);
    try {
        if (!req.user || req.user.role !== 'DONOR') throw { status: 403, message: 'Only donors can donate' };
        const data = donationSchema.parse(req.body);
        const campaign = await prisma.campaign.findUnique({ where: { id: data.campaignId } });
        if (!campaign || campaign.status !== 'active') throw { status: 404, message: 'Campaign not found or inactive' };
        // Create donation
        const donation = await donationService.createDonation({
            donorId: req.user.id,
            campaignId: data.campaignId,
            amount: data.amount,
            type: data.type
        });
        // Update campaign's currentAmount
        await prisma.campaign.update({
            where: { id: data.campaignId },
            data: { currentAmount: { increment: data.amount } }
        });
        logger.info(`[createDonation] Success: user=${req.user?.id || 'guest'} campaign=${data.campaignId} amount=${data.amount}`);
        
        // Log user activity
        if (req.user) {
            logUserActivity(req.user.id, 'DONATION_CREATED', `User made a donation of $${data.amount}`, `Campaign: ${campaign.title}, Type: ${data.type}`);
        }
        
        res.status(201).json({ donation, message: 'Donation successful' });
    } catch (err) {
        logger.error(`[createDonation] Error: ${err && err.message ? err.message : JSON.stringify(err)}`);
        throw err;
    }
});

export const getDonationHistory = catchAsync(async (req, res) => {
    if (!req.user) throw { status: 401, message: 'Authentication required' };
    let donations;
    if (req.user.role === 'DONOR') {
        donations = await donationService.getDonationsByDonor(req.user.id);
    } else if (req.user.role === 'CREATOR') {
        // Get all donations to creator's campaigns
        const campaigns = await prisma.campaign.findMany({ where: { creatorId: req.user.id }, select: { id: true } });
        const campaignIds = campaigns.map(c => c.id);
        donations = await donationService.getDonationsByCampaigns(campaignIds);
    } else {
        donations = [];
    }
    res.json({ donations });
});

export const simulateRecurringDonations = catchAsync(async (req, res) => {
    const count = await donationService.simulateRecurringDonations();
    res.json({ message: 'Recurring donations simulated', count });
});

export const createStripeSession = catchAsync(async (req, res) => {
    logger.info(`[createStripeSession] Request body: ${JSON.stringify(req.body)}`);
    try {
        const { campaignId, amount, guestEmail, captcha } = req.body;
        // Verify reCAPTCHA
        const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`
        });
        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
            logger.error(`[createStripeSession] CAPTCHA verification failed`);
            return res.status(400).json({ message: 'CAPTCHA verification failed' });
        }
        // Find campaign
        const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
        if (!campaign || campaign.status !== 'active') throw { status: 404, message: 'Campaign not found or inactive' };

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: { name: `Donation to ${campaign.title}` },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
            metadata: {
                campaignId,
                guestEmail: guestEmail || '',
                donorId: req.user?.id || '', // Include user ID if logged in
            },
            receipt_email: guestEmail || undefined,
        });
        logger.info(`[createStripeSession] Stripe session created: ${session.id}`);
        res.json({ sessionId: session.id });
    } catch (err) {
        logger.error(`[createStripeSession] Error: ${err && err.message ? err.message : JSON.stringify(err)}`);
        throw err;
    }
});

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    let stripeSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';
    try {
        const rawBody = req.rawBody || req.body;
        event = stripe.webhooks.constructEvent(rawBody, sig, stripeSecret);
        logger.info(`[handleStripeWebhook] Received event: ${event.type}`);
    } catch (err) {
        logger.error(`[handleStripeWebhook] Webhook signature verification failed: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        try {
            const campaignId = session.metadata.campaignId;
            const guestEmail = session.metadata.guestEmail || null;
            const donorId = session.metadata.donorId || null;
            const amount = session.amount_total / 100;

            // Create donation with proper donor info
            const donation = await donationService.createDonation({
                donorId: donorId || null,
                guestEmail,
                campaignId,
                amount,
                type: 'ONE_TIME'
            });

            // Create transaction record
            await prisma.transaction.create({
                data: {
                    donationId: donation.id,
                    paymentId: session.payment_intent || session.id,
                    provider: 'Stripe',
                    status: 'success',
                    amount: amount
                }
            });

            await prisma.campaign.update({
                where: { id: campaignId },
                data: { currentAmount: { increment: amount } }
            });
            logger.info(`[handleStripeWebhook] Donation created for campaign=${campaignId} amount=${amount} donorId=${donorId}`);
        } catch (err) {
            logger.error(`[handleStripeWebhook] Error creating donation: ${err.message}`);
        }
    }
    res.json({ received: true });
}; 
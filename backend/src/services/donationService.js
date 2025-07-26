import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef'; // 32 chars
const IV_LENGTH = 16;

function encrypt(text) {
    if (!text) return text;
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    if (!text) return text;
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export const createDonation = async (data) => {
    const toStore = { ...data };
    if (toStore.guestEmail) {
        toStore.guestEmail = encrypt(toStore.guestEmail);
    }
    return prisma.donation.create({ data: toStore });
};

export const getDonationsByDonor = async (donorId) => {
    const donations = await prisma.donation.findMany({ where: { donorId }, orderBy: { date: 'desc' } });
    return donations.map(d => ({ ...d, guestEmail: decrypt(d.guestEmail) }));
};

export const getDonationsByCampaigns = async (campaignIds) => {
    const donations = await prisma.donation.findMany({ where: { campaignId: { in: campaignIds } }, orderBy: { date: 'desc' } });
    return donations.map(d => ({ ...d, guestEmail: decrypt(d.guestEmail) }));
};

export const simulateRecurringDonations = async () => {
    const now = new Date();
    const due = await prisma.recurringDonation.findMany({ where: { nextDonationDate: { lte: now } } });
    for (const rec of due) {
        await prisma.donation.create({
            data: {
                donorId: rec.donorId,
                campaignId: rec.campaignId,
                amount: rec.amount,
                type: 'RECURRING'
            }
        });
        await prisma.campaign.update({
            where: { id: rec.campaignId },
            data: { currentAmount: { increment: rec.amount } }
        });
        // Set next donation date (mock monthly)
        const next = new Date(rec.nextDonationDate);
        next.setMonth(next.getMonth() + 1);
        await prisma.recurringDonation.update({ where: { id: rec.id }, data: { nextDonationDate: next } });
    }
    return due.length;
}; 
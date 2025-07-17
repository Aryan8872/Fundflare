import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createDonation = async (data) => {
    return prisma.donation.create({ data });
};

export const getDonationsByDonor = async (donorId) => {
    return prisma.donation.findMany({ where: { donorId }, orderBy: { date: 'desc' } });
};

export const getDonationsByCampaigns = async (campaignIds) => {
    return prisma.donation.findMany({ where: { campaignId: { in: campaignIds } }, orderBy: { date: 'desc' } });
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
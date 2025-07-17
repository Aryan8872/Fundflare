import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllCampaigns = async (where = {}, orderBy = { createdAt: 'desc' }) => {
    return prisma.campaign.findMany({ where, orderBy });
};

export const getCampaignById = async (id) => {
    return prisma.campaign.findUnique({ where: { id } });
};

export const createCampaign = async (data) => {
    return prisma.campaign.create({ data });
};

export const updateCampaign = async (id, data) => {
    return prisma.campaign.update({ where: { id }, data });
};

export const deleteCampaign = async (id) => {
    return prisma.campaign.delete({ where: { id } });
}; 
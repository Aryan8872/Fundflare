import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@fundflare.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@fundflare.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Create regular user
    const regularUser = await prisma.user.upsert({
        where: { email: 'user@fundflare.com' },
        update: {},
        create: {
            name: 'Regular User',
            email: 'user@fundflare.com',
            password: hashedPassword,
            role: 'DONOR',
        },
    });

    // Create campaigns
    const campaignsData = [
        {
            title: 'Clean Water for All',
            description: 'Help us provide clean and safe drinking water to remote villages.',
            goalAmount: 50000,
            currentAmount: 25000,
            duration: 90,
            category: 'Health',
            coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            status: 'active',
            creatorId: adminUser.id,
        },
        {
            title: 'Solar Power for Schools',
            description: 'Support our mission to install solar panels in rural schools.',
            goalAmount: 30000,
            currentAmount: 10000,
            duration: 60,
            category: 'Education',
            coverImage: 'https://images.unsplash.com/photo-1464983953574-0892a716854b',
            status: 'active',
            creatorId: adminUser.id,
        },
        {
            title: 'Medical Aid for Children',
            description: 'Fund life-saving medical treatments for children in need.',
            goalAmount: 20000,
            currentAmount: 5000,
            duration: 45,
            category: 'Medical',
            coverImage: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
            status: 'active',
            creatorId: adminUser.id,
        },
    ];
    const createdCampaigns = await Promise.all(
        campaignsData.map(data => prisma.campaign.create({ data }))
    );

    // Add more users
    const creatorUser = await prisma.user.upsert({
        where: { email: 'creator@fundflare.com' },
        update: {},
        create: {
            name: 'Campaign Creator',
            email: 'creator@fundflare.com',
            password: hashedPassword,
            role: 'CREATOR',
        },
    });

    const donorUser2 = await prisma.user.upsert({
        where: { email: 'donor2@fundflare.com' },
        update: {},
        create: {
            name: 'Second Donor',
            email: 'donor2@fundflare.com',
            password: hashedPassword,
            role: 'DONOR',
        },
    });

    // Add a specific admin user for aryanbudathoki44@gmail.com
    const adminAryan = await prisma.user.upsert({
        where: { email: 'aryanbudathoki44@gmail.com' },
        update: {},
        create: {
            name: 'Aryan Budathoki',
            email: 'aryanbudathoki44@gmail.com',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    // Add more campaigns
    const moreCampaigns = [
        {
            title: 'Books for Kids',
            description: 'Donate books to underprivileged children.',
            goalAmount: 8000,
            currentAmount: 2000,
            duration: 30,
            category: 'Education',
            coverImage: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
            status: 'active',
            creatorId: creatorUser.id,
        },
        {
            title: 'Disaster Relief Fund',
            description: 'Support families affected by natural disasters.',
            goalAmount: 100000,
            currentAmount: 40000,
            duration: 120,
            category: 'Relief',
            coverImage: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429',
            status: 'active',
            creatorId: creatorUser.id,
        },
    ];
    const allCampaigns = createdCampaigns.concat(
        await Promise.all(moreCampaigns.map(data => prisma.campaign.create({ data })))
    );

    // Create donations
    const donationsData = [
        {
            amount: 1000,
            campaignId: createdCampaigns[0].id,
            donorId: regularUser.id,
            date: new Date('2024-06-10'),
            type: 'ONE_TIME',
        },
        {
            amount: 500,
            campaignId: createdCampaigns[1].id,
            donorId: regularUser.id,
            date: new Date('2024-07-15'),
            type: 'ONE_TIME',
        },
        {
            amount: 200,
            campaignId: createdCampaigns[2].id,
            donorId: regularUser.id,
            date: new Date('2024-08-20'),
            type: 'ONE_TIME',
        },
    ];
    await prisma.donation.createMany({ data: donationsData, skipDuplicates: true });

    // Add more donations
    const moreDonations = [
        {
            amount: 150,
            campaignId: allCampaigns[3].id,
            donorId: donorUser2.id,
            date: new Date('2024-09-01'),
            type: 'ONE_TIME',
        },
        {
            amount: 300,
            campaignId: allCampaigns[4].id,
            donorId: regularUser.id,
            date: new Date('2024-09-10'),
            type: 'ONE_TIME',
        },
    ];
    await prisma.donation.createMany({ data: moreDonations, skipDuplicates: true });

    console.log('Database seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error('Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    }); 
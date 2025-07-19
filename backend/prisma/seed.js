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
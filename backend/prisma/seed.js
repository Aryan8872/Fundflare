import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding...');

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@gcamping.com' },
        update: {},
        create: {
            name: 'Admin User',
            email: 'admin@gcamping.com',
            password: hashedPassword,
            role: 'admin',
        },
    });

    // Create regular user
    const regularUser = await prisma.user.upsert({
        where: { email: 'user@gcamping.com' },
        update: {},
        create: {
            name: 'Regular User',
            email: 'user@gcamping.com',
            password: hashedPassword,
            role: 'user',
        },
    });

    // Create camping sites
    const campingSitesData = [
        {
            name: 'Bell Glamp One',
            description: 'A luxury glamping tent with all amenities for a comfortable stay. Experience the perfect blend of nature and comfort with our premium glamping setup.',
            location: 'Mountain Valley, CA',
            price: 120,
            type: 'glamp',
            capacity: 6,
            size: '17m²',
            amenities: ['Electricity', 'WiFi', 'Kitchen', 'Bathroom', 'Heating'],
            images: ['/assets/images/glampimage.png'],
            status: 'active',
            latitude: 37.7749,
            longitude: -122.4194,
        },
        {
            name: 'Caravan Solar Tent',
            description: 'Eco-friendly caravan tent with solar power and modern facilities. Perfect for environmentally conscious campers who want modern conveniences.',
            location: 'Desert Springs, AZ',
            price: 100,
            type: 'caravan',
            capacity: 4,
            size: '15m²',
            amenities: ['Solar Power', 'Kitchen', 'Bathroom', 'Air Conditioning'],
            images: ['/assets/images/trailerimage.png'],
            status: 'active',
            latitude: 33.4484,
            longitude: -112.0740,
        },
        {
            name: 'Glamping Tent',
            description: 'Spacious glamping tent perfect for families and groups. Enjoy the outdoors with the comfort of a hotel room.',
            location: 'Forest Haven, OR',
            price: 90,
            type: 'tent',
            capacity: 6,
            size: '20m²',
            amenities: ['Comfortable Beds', 'Heating', 'Lighting', 'Storage'],
            images: ['/assets/images/campingtentimage.png'],
            status: 'active',
            latitude: 45.5152,
            longitude: -122.6784,
        },
        {
            name: 'Small Cabin Wood',
            description: 'Cozy wooden cabin nestled in nature for a peaceful retreat. Perfect for couples or small families seeking tranquility.',
            location: 'Pine Ridge, WA',
            price: 150,
            type: 'cabin',
            capacity: 4,
            size: '25m²',
            amenities: ['Fireplace', 'Kitchen', 'Bathroom', 'Deck', 'BBQ'],
            images: ['/assets/images/activityimg.png'],
            status: 'active',
            latitude: 47.6062,
            longitude: -122.3321,
        },
        {
            name: 'Mountain View Camper',
            description: 'Modern camper with stunning mountain views. Equipped with all modern amenities for a comfortable camping experience.',
            location: 'Rocky Peak, CO',
            price: 110,
            type: 'camper',
            capacity: 5,
            size: '18m²',
            amenities: ['Mountain View', 'Kitchen', 'Bathroom', 'Heating', 'WiFi'],
            images: ['/assets/images/campingtentimage.png'],
            status: 'active',
            latitude: 39.7392,
            longitude: -104.9903,
        },
        {
            name: 'Lakeside Retreat',
            description: 'Beautiful lakeside camping site with fishing and water activities. Perfect for water enthusiasts and nature lovers.',
            location: 'Crystal Lake, MI',
            price: 85,
            type: 'tent',
            capacity: 8,
            size: '30m²',
            amenities: ['Lake Access', 'Fishing Gear', 'Boat Rental', 'Fire Pit'],
            images: ['/assets/images/glampimage.png'],
            status: 'active',
            latitude: 42.3314,
            longitude: -83.0458,
        },
    ];
    await prisma.campingSite.createMany({ data: campingSitesData, skipDuplicates: true });

    // Fetch camping sites to get their IDs
    const campingSites = await prisma.campingSite.findMany();

    // Create gallery images
    const galleryImagesData = [
        {
            title: 'Sunset at Bell Glamp',
            description: 'Beautiful sunset view from our premium glamping site',
            imageUrl: '/assets/images/glampimage.png',
            category: 'glamp',
            campingSiteId: campingSites[0]?.id,
            status: 'active',
        },
        {
            title: 'Solar Caravan Interior',
            description: 'Modern interior of our eco-friendly solar caravan',
            imageUrl: '/assets/images/trailerimage.png',
            category: 'caravan',
            campingSiteId: campingSites[1]?.id,
            status: 'active',
        },
        {
            title: 'Family Camping',
            description: 'Perfect family camping experience in our spacious tent',
            imageUrl: '/assets/images/campingtentimage.png',
            category: 'tent',
            campingSiteId: campingSites[2]?.id,
            status: 'active',
        },
        {
            title: 'Cozy Cabin',
            description: 'Warm and inviting wooden cabin in the forest',
            imageUrl: '/assets/images/activityimg.png',
            category: 'cabin',
            campingSiteId: campingSites[3]?.id,
            status: 'active',
        },
        {
            title: 'Mountain Views',
            description: 'Breathtaking mountain views from our camper site',
            imageUrl: '/assets/images/campingtentimage.png',
            category: 'camper',
            campingSiteId: campingSites[4]?.id,
            status: 'active',
        },
        {
            title: 'Lakeside Activities',
            description: 'Enjoy water activities at our lakeside retreat',
            imageUrl: '/assets/images/glampimage.png',
            category: 'activities',
            campingSiteId: campingSites[5]?.id,
            status: 'active',
        },
        {
            title: 'Nature Trail',
            description: 'Explore beautiful nature trails around our camping sites',
            imageUrl: '/assets/images/campingtentimage.png',
            category: 'nature',
            status: 'active',
        },
        {
            title: 'Campfire Evening',
            description: 'Cozy campfire evenings with family and friends',
            imageUrl: '/assets/images/trailerimage.png',
            category: 'activities',
            status: 'active',
        },
    ];
    await prisma.galleryImage.createMany({ data: galleryImagesData, skipDuplicates: true });

    // Create sample bookings
    await prisma.booking.create({
        data: {
            userId: regularUser.id,
            campingSiteId: campingSites[0]?.id,
            checkin: new Date('2024-07-15'),
            checkout: new Date('2024-07-17'),
            guests: 4,
            total: 240,
            status: 'active',
        },
    });
    await prisma.booking.create({
        data: {
            userId: regularUser.id,
            campingSiteId: campingSites[2]?.id,
            checkin: new Date('2024-07-20'),
            checkout: new Date('2024-07-22'),
            guests: 6,
            total: 180,
            status: 'active',
        },
    });

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
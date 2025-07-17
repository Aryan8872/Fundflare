import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixCampingSiteStatus() {
    try {
        // Update camping sites with 'available' status to 'active'
        const availableSites = await prisma.campingSite.updateMany({
            where: { status: 'available' },
            data: { status: 'active' }
        });

        // Update camping sites with 'unavailable' status to 'inactive'
        const unavailableSites = await prisma.campingSite.updateMany({
            where: { status: 'unavailable' },
            data: { status: 'inactive' }
        });

        console.log(`Updated ${availableSites.count} sites from 'available' to 'active'`);
        console.log(`Updated ${unavailableSites.count} sites from 'unavailable' to 'inactive'`);

        // Show all camping sites
        const allSites = await prisma.campingSite.findMany({
            select: { id: true, name: true, status: true }
        });

        console.log('\nAll camping sites:');
        allSites.forEach(site => {
            console.log(`- ${site.name}: ${site.status}`);
        });

    } catch (error) {
        console.error('Error fixing camping site status:', error);
    } finally {
        await prisma.$disconnect();
    }
}

fixCampingSiteStatus(); 
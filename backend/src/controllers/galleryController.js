import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import catchAsync from '../utils/catchAsync.js';

const prisma = new PrismaClient();

const createGalleryImageSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    imageUrl: z.string().url(),
    category: z.string(),
    campingSiteId: z.string().uuid().optional(),
});

const updateGalleryImageSchema = createGalleryImageSchema.partial();

export const getAllGalleryImages = catchAsync(async (req, res) => {
    const { search, category, limit } = req.query;

    const where = {
        status: 'active',
    };

    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }

    if (category && category !== 'All') {
        where.category = category;
    }

    const take = limit ? parseInt(limit) : undefined;

    const images = await prisma.galleryImage.findMany({
        where,
        include: {
            campingSite: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    price: true,
                    capacity: true,
                    type: true,
                },
            },
        },
        orderBy: { createdAt: 'desc' },
        take,
    });

    res.json({ images });
});

export const getGalleryImageById = catchAsync(async (req, res) => {
    const { id } = req.params;

    const image = await prisma.galleryImage.findUnique({
        where: { id },
        include: {
            campingSite: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    price: true,
                    capacity: true,
                    type: true,
                },
            },
        },
    });

    if (!image) {
        throw { status: 404, message: 'Gallery image not found' };
    }

    res.json({ image });
});

export const createGalleryImage = catchAsync(async (req, res) => {
    const data = createGalleryImageSchema.parse(req.body);

    // If campingSiteId is provided, verify it exists
    if (data.campingSiteId) {
        const campingSite = await prisma.campingSite.findUnique({
            where: { id: data.campingSiteId },
        });

        if (!campingSite) {
            throw { status: 404, message: 'Camping site not found' };
        }
    }

    const image = await prisma.galleryImage.create({
        data,
        include: {
            campingSite: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    price: true,
                    capacity: true,
                    type: true,
                },
            },
        },
    });

    res.status(201).json({ image });
});

export const updateGalleryImage = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = updateGalleryImageSchema.parse(req.body);

    // Check if image exists
    const existingImage = await prisma.galleryImage.findUnique({
        where: { id },
    });

    if (!existingImage) {
        throw { status: 404, message: 'Gallery image not found' };
    }

    // If campingSiteId is provided, verify it exists
    if (data.campingSiteId) {
        const campingSite = await prisma.campingSite.findUnique({
            where: { id: data.campingSiteId },
        });

        if (!campingSite) {
            throw { status: 404, message: 'Camping site not found' };
        }
    }

    const image = await prisma.galleryImage.update({
        where: { id },
        data,
        include: {
            campingSite: {
                select: {
                    id: true,
                    name: true,
                    location: true,
                    price: true,
                    capacity: true,
                    type: true,
                },
            },
        },
    });

    res.json({ image });
});

export const deleteGalleryImage = catchAsync(async (req, res) => {
    const { id } = req.params;

    const image = await prisma.galleryImage.findUnique({
        where: { id },
    });

    if (!image) {
        throw { status: 404, message: 'Gallery image not found' };
    }

    await prisma.galleryImage.delete({
        where: { id },
    });

    res.json({ message: 'Gallery image deleted successfully' });
});

export const getGalleryCategories = catchAsync(async (req, res) => {
    const categories = await prisma.galleryImage.findMany({
        select: {
            category: true,
        },
        distinct: ['category'],
        where: {
            status: 'active',
        },
    });

    const categoryList = categories.map(cat => cat.category);
    res.json({ categories: categoryList });
}); 
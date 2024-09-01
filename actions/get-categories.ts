import prisma from '@/lib/prisma';

export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.error('Error fetching colors:', error);
        return [];
    }
};

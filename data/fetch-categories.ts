import Prisma from '@/lib/prisma';
import { Category } from '@prisma/client';

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const categories = await Prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        detailCategories: true,
                    },
                },
            },
        });
        return categories as Category[];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

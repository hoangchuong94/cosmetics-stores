import Prisma from '@/lib/prisma';
import { Color } from '@prisma/client';
export const fetchColors = async (): Promise<Color[]> => {
    try {
        const listColor = await Prisma.color.findMany();
        return listColor;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

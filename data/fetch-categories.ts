import Prisma from "@/lib/prisma";
import { Category } from "@/types";

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
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

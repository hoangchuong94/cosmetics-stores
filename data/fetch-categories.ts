import Prisma from "@/lib/prisma";
import { Category } from "@/types";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categories = await Prisma.category.findMany({
      include: {
        subCategories: {
          include: {
            products: true,
          },
        },
      },
    });

    categories.forEach((category) =>
      category.subCategories.forEach((subCategory) => console.log(subCategory))
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "@/lib/prisma";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const categories = await Prisma.category.findMany({
    include: {
      subCategories: {
        include: {
          detailCategories: true,
        },
      },
    },
  });
  return res.status(200).json({ categories });
};

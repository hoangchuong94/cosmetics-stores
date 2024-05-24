import { NextApiRequest } from "next";
import Prisma from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

export const GET = async (req: NextApiRequest) => {
  const categories = await Prisma.category.findMany({
    include: {
      subCategories: {
        include: {
          detailCategories: true,
        },
      },
    },
  });
  return Response.json({ categories });
};

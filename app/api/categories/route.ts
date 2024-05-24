import { NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export const GET = async () => {
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
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

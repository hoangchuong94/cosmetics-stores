import {
  Category as PrismaCategory,
  SubCategory as PrismaSubCategory,
  Product as PrismaProduct,
} from "@prisma/client";

export interface Product extends PrismaProduct {}

export interface SubCategory extends PrismaSubCategory {
  products: Product[];
}

export interface Category extends PrismaCategory {
  subCategories: SubCategory[];
}

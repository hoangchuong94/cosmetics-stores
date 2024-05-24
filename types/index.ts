import {
  Category as PrismaCategory,
  SubCategory as PrismaSubCategory,
  DetailCategory as PrismaDetailCategory,
  Product as PrismaProduct,
  UserRole,
} from "@prisma/client";
import { StaticImageData } from "next/image";

export interface Product extends PrismaProduct {}

export interface DetailCategory extends PrismaDetailCategory {
  products: Product[];
}

export interface SubCategory extends PrismaSubCategory {
  detailCategories: DetailCategory[];
}

export interface Category extends PrismaCategory {
  subCategories: SubCategory[];
}

declare module "next-auth" {
  interface User {
    role: UserRole;
  }
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  type: string;
  image: StaticImageData;
  price: number;
  sale: number;
  star: number;
  quantity: number;
}

import {
    Category as PrismaCategory,
    SubCategory as PrismaSubCategory,
    DetailCategory as PrismaDetailCategory,
    Product as PrismaProduct,
} from '@prisma/client';

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

export interface ProductType {
    id: string;
    name: string;
    description: string;
    type: string;
    image: string;
    price: number;
    sale: number;
    star: number;
    quantity: number;
}

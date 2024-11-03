import { FileState } from '@/components/edgestore/multi-image-dropzone';
import {
    Category as CategoryPrima,
    SubCategory as SubCategoryPrisma,
    DetailCategory as DetailCategoryPrisma,
    Product as ProductPrisma,
    Color as ColorPrisma,
    Image as ImagePrisma,
    Promotion as PromotionPrisma,
} from '@prisma/client';

export type DataToCreateAndUpdateProduct = {
    colors: ColorPrisma[];
    categories: CategoryPrima[];
    subCategories: SubCategoryPrisma[];
    detailCategories: DetailCategoryPrisma[];
    promotions: PromotionPrisma[];
};

export type ProductWithDetails = ProductPrisma & {
    images: { image: ImagePrisma }[];
    colors: { color: ColorPrisma }[];
    promotions: { promotion: PromotionPrisma }[];
    detailCategory: DetailCategoryPrisma;
};

export type CategoryWithDetails = CategoryPrima & {
    subCategories: SubCategoryWithDetails[];
};

export type SubCategoryWithDetails = SubCategoryPrisma & {
    detailCategories: DetailCategoryPrisma[];
};

export interface CustomTypeUser {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
}

export interface UploadedImage {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: {
        type: string;
    };
    pathOrder: 'type'[];
}

export interface Product {
    name: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
    capacity: number;
    thumbnailUrl: string;
    colors: ColorPrisma[];
    imageUrls: string[];
    promotions: PromotionPrisma[];
    detailCategoryId: string;
}

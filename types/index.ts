import { FileState } from '@/components/edgestore/multi-image-dropzone';
import {
    Category,
    SubCategory,
    DetailCategory,
    Product,
    Color,
    Image,
    Promotion,
} from '@prisma/client';

export type DataToCreateAndUpdateProduct = {
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
};

export type ProductWithDetails = Product & {
    images: { image: Image }[];
    colors: { color: Color }[];
    promotions: { promotion: Promotion }[];
    detailCategory: DetailCategory;
};

export type CategoryWithDetails = Category & {
    subCategories: SubCategoryWithDetails[];
};

export type SubCategoryWithDetails = SubCategory & {
    detailCategories: DetailCategory[];
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

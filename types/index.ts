export type CustomTypeUser = {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
};

export type Color = {
    name: string;
    id: string;
    code: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Category = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type SubCategory = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    categoryId: string;
};

export type DetailCategory = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    subCategoryId: string;
};

export type Image = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    url: string;
};

export type Promotion = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    startDay: Date;
    endDay: Date;
};

export type Product = {
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    type: string;
    price: number;
    quantity: number;
    capacity: number;
    thumbnail: string;
    detailCategoryId: string;
};

export type ProductDetail = {
    id: string;
    name: string;
    description: string;
    type: string;
    price: number;
    quantity: number;
    capacity: number;
    thumbnail: string;
    images: Image[];
    colors: Color[];
    promotions: Promotion[];
    detailCategory: DetailCategory;
    subCategory: SubCategory;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
};

export type UploadedImage = {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: {
        type: string;
    };
    pathOrder: 'type'[];
};

export type ProductActionData = {
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
    promotions: Promotion[];
};

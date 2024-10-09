'use server';
import CreateProductForm from '@/components/admin/create-product-form';
import EditProductForm from '@/components/admin/edit-product-form';
import { Category, Color, DetailCategory, SubCategory } from '@prisma/client';
import {
    getCategories,
    getColors,
    getDetailCategories,
    getSubCategories,
    getProductById,
} from '@/actions/controller-product';
import { notFound } from 'next/navigation';

const page = async ({ params }: { params: { crud: string[] } }) => {
    const action = params.crud[0];
    const idProduct = params.crud[1];

    const [colors, categories, subCategories, detailCategories] =
        await Promise.all([
            getColors(),
            getCategories(),
            getSubCategories(),
            getDetailCategories(),
        ]);

    if (!colors || !categories || !subCategories || !detailCategories) {
        return <div>Error loading data. Please try again later.</div>;
    }

    switch (action) {
        case 'create':
            if (idProduct) {
                return notFound();
            }
            return (
                <CreateProductForm
                    colors={colors}
                    categories={categories}
                    subCategories={subCategories}
                    detailCategories={detailCategories}
                />
            );

        case 'edit': {
            if (!idProduct) {
                return <div>Product ID is required for editing.</div>;
            }

            const product = await getProductById(idProduct);
            if (!product) {
                return (
                    <div className="flex h-full items-center justify-center">
                        Product not found. Please check the ID.
                    </div>
                );
            }

            const detailCategory = product.detailCategories[0].detailCategory;

            const subCategory = subCategories.find(
                (item) => item.id === detailCategory.subCategoryId,
            );

            const category = categories.find(
                (item) => item.id === subCategory?.categoryId,
            );

            if (!subCategory || !category) {
                return (
                    <div className="flex h-full items-center justify-center">
                        Product or related categories not found. Please check
                        the ID.
                    </div>
                );
            }

            const productEditById = {
                ...product,
                subCategory: subCategory,
                category: category,
            };

            return (
                <EditProductForm
                    product={productEditById}
                    colors={colors}
                    categories={categories}
                    subCategories={subCategories}
                    detailCategories={detailCategories}
                />
            );
        }

        default:
            return notFound();
    }
};

export default page;

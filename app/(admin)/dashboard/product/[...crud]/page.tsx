'use server';
import { notFound } from 'next/navigation';

import UpdateProductForm from '@/components/admin/update-product-form';
import CreateProductForm from '@/components/admin/create-product-form';
import { fetchDataToCreateAndUpdateProducts } from '@/data/fetch-data';
import { fetchProductById } from '@/data/fetch-data';

const page = async ({ params }: { params: { crud: string[] } }) => {
    const result = await fetchDataToCreateAndUpdateProducts();

    if (Array.isArray(result)) {
        return (
            <div className="flex h-screen items-center justify-center">
                Error loading data. Please try again later.
            </div>
        );
    }

    const { colors, categories, subCategories, detailCategories, promotions } =
        result;

    if (
        colors.length === 0 ||
        categories.length === 0 ||
        subCategories.length === 0 ||
        detailCategories.length === 0
    ) {
        return (
            <div className="flex h-screen items-center justify-center">
                Please add color, category, detail category, sub category before
                creating products
            </div>
        );
    }

    const action = params.crud[0];
    const idProduct = params.crud[1];

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
                    promotions={promotions}
                />
            );

        case 'update': {
            if (!idProduct) {
                return <div>Product ID is required for updating.</div>;
            }

            const currentProduct = await fetchProductById(idProduct);
            if (!currentProduct) {
                return (
                    <div className="flex h-full items-center justify-center">
                        Product not found. Please check the ID.
                    </div>
                );
            }

            const detailCategory = currentProduct.detailCategory;

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

            const product = {
                ...currentProduct,
                subCategory: subCategory,
                category: category,
            };

            return (
                <UpdateProductForm
                    product={product}
                    colors={colors}
                    categories={categories}
                    subCategories={subCategories}
                    detailCategories={detailCategories}
                    promotions={promotions}
                />
            );
        }

        default:
            return notFound();
    }
};

export default page;

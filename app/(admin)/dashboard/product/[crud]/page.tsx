'use server';

import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

import { fetchProductActionData } from '@/data/fetch-data';
import { fetchProductById } from '@/data/fetch-data';

import UpdateProductForm from '@/components/admin/update-product-form';
import CreateProductForm from '@/components/admin/create-product-form';
import TestImage from '@/components/admin/test-image';

const page = async ({
    params,
    searchParams,
}: {
    params: { crud: string };
    searchParams: { [key: string]: string };
}) => {
    const action = params.crud;
    const productId = searchParams.id;
    const data = await fetchProductActionData();

    if (Array.isArray(data)) {
        return (
            <div className="flex h-screen items-center justify-center">
                Error loading data. Please try again later.
            </div>
        );
    }

    if (
        data.colors.length === 0 ||
        data.categories.length === 0 ||
        data.subCategories.length === 0 ||
        data.detailCategories.length === 0
    ) {
        return (
            <div className="flex h-screen items-center justify-center">
                Please add color, category, detail category, sub category before
                creating products
            </div>
        );
    }

    switch (action) {
        case 'create':
            return <CreateProductForm productActionData={data} />;

        case 'update': {
            if (!productId) {
                redirect('/dashboard/product');
            }
            const product = await fetchProductById(productId);
            if (!product || Array.isArray(product)) {
                return (
                    <div className="flex h-full items-center justify-center">
                        An error occurred. Please check your product ID or try
                        again later.
                    </div>
                );
            }
            return (
                <UpdateProductForm product={product} productActionData={data} />
            );
        }

        case 'delete':
            return (
                <div className="flex h-screen items-center justify-center">
                    <TestImage />
                </div>
            );
        default:
            notFound();
    }
};

export default page;

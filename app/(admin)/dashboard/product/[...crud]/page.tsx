import CreateProductForm from '@/components/admin/create-product-form';
import React from 'react';
import { getColors } from '@/actions/get-colors';
import { getCategories } from '@/actions/get-categories';

const CreateProduct = async () => {
    const colors = await getColors();
    const categories = await getCategories();
    return <CreateProductForm colors={colors} categories={categories} />;
};

export default CreateProduct;

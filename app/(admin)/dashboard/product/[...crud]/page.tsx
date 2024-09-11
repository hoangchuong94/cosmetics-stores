import TestUploadFile from '@/components/admin/test-upload-image';
import {
    getCategories,
    getColors,
    getDetailCategories,
    getSubCategories,
} from '@/actions/controller-product';

const CreateProduct = async () => {
    try {
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

        return (
            // <CreateProductForm
            //     colors={colors}
            //     categories={categories}
            //     detailCategories={detailCategories}
            //     subCategories={subCategories}
            // />
            <TestUploadFile />
        );
    } catch (error) {
        console.error('Error loading product data:', error);
        return <div>Failed to load product data. Please try again later.</div>;
    }
};

export default CreateProduct;

import ProductManagement from '@/components/admin/product-management';
import { fetchAllProduct } from '@/data/fetch-data';

const ProductManagementPage = async () => {
    const listProduct = await fetchAllProduct();

    return (
        <>
            {listProduct ? (
                <ProductManagement listProduct={listProduct} />
            ) : (
                <div className="flex h-full items-center justify-center text-red-500">
                    An error occurred. Please try again later
                </div>
            )}
        </>
    );
};

export default ProductManagementPage;

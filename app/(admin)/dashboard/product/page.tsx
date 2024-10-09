import ControlPanelProducts from '@/components/admin/control-panel-products';
import { getProducts } from '@/actions/controller-product';

const Products = async () => {
    const listProduct = await getProducts();

    return <ControlPanelProducts listProduct={listProduct} />;
};

export default Products;

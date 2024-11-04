import backgroundImage1 from '@/public/static/background-home.jpg';
import backgroundImage2 from '@/public/static/bg-03.jpg';
import Background from '@/components/user/background';
import Supplier from '@/components/user/supplier';
import OverviewComment from '@/components/user/overview-comment';
import GiftProduct from '@/components/user/gift-product';
import ShippingInformation from '@/components/user/shipping-information';
import ProductList from '@/components/user/product-list';
import { fetchAllProduct } from '@/data/fetch-data';

export default async function HomePage() {
    const products = await fetchAllProduct();

    return (
        <main>
            <div className="px-5 pt-24">
                <Background
                    title="new in town"
                    name="The New Beauty Collection"
                    description="This new collection brings with it the most exciting lorem ipsum dolor sit a met."
                    image={backgroundImage1}
                    fixed
                />
                <Supplier />
                <div className="mt-28">
                    <div className="flex flex-col items-center py-10 capitalize">
                        <h6 className="text-[#5d5b5b]">popular products</h6>
                        <h2 className="text-3xl">trending now</h2>
                    </div>
                    <ProductList products={products} />
                </div>
                <div className="mb-40 mt-10">
                    <div className="flex flex-col items-center py-10 capitalize">
                        <h6 className="text-[#5d5b5b]">shop</h6>
                        <h2 className="text-3xl">best selling</h2>
                    </div>
                    <ProductList products={products} />
                </div>
                <Background
                    title="new collection"
                    name="The beauty collection that makes all the difference!"
                    description="Aliquam vulputate, nunc vitae suscipit aliquet, libero arcu hendrerit sapien."
                    image={backgroundImage2}
                    fixed
                />
                <OverviewComment />
                <GiftProduct />
                <ShippingInformation />
            </div>
        </main>
    );
}

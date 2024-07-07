import backgroundImage1 from '@/public/static/background-home.jpg';
import backgroundImage2 from '@/public/static/bg-03.jpg';
import Background from '@/components/user/background';
import Supplier from '@/components/user/supplier';
import TrendingProducts from '@/components/user/trending-products';
import BestSaleProducts from '@/components/user/best-sale-products';
import OverviewComment from '@/components/user/overview-comment';
import GiftProduct from '@/components/user/gift-product';
import ShippingInformation from '@/components/user/shipping-information';

export default function HomePage() {
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
                <TrendingProducts />
                <BestSaleProducts />
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

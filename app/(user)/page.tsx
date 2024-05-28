import backgroundImage1 from "@/public/static/background-home.jpg";
import backgroundImage2 from "@/public/static/bg-03.jpg";
import Background from "@/components/background";
import Supplier from "@/components/supplier";
import TrendingProducts from "@/components/trending-products";
import BestSaleProducts from "@/components/best-sale-products";
import OverviewComment from "@/components/overview-comment";
import GiftProduct from "@/components/gift-product";
import ShippingInformation from "@/components/shipping-information";

export default function HomePage() {
  return (
    <div className="pt-20">
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
  );
}

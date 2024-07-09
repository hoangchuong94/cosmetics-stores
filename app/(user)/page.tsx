// import backgroundImage1 from '@/public/static/background-home.jpg';
// import backgroundImage2 from '@/public/static/bg-03.jpg';
// import Background from '@/components/user/background';
// import Supplier from '@/components/user/supplier';
// import TrendingProducts from '@/components/user/trending-products';
// import BestSaleProducts from '@/components/user/best-sale-products';
// import OverviewComment from '@/components/user/overview-comment';
// import GiftProduct from '@/components/user/gift-product';
// import ShippingInformation from '@/components/user/shipping-information';

// export default function HomePage() {
//     return (
//         <main>
//             <div className="px-5 pt-24">
//                 <Background
//                     title="new in town"
//                     name="The New Beauty Collection"
//                     description="This new collection brings with it the most exciting lorem ipsum dolor sit a met."
//                     image={backgroundImage1}
//                     fixed
//                 />
//                 <Supplier />
//                 <TrendingProducts />
//                 <BestSaleProducts />
//                 <Background
//                     title="new collection"
//                     name="The beauty collection that makes all the difference!"
//                     description="Aliquam vulputate, nunc vitae suscipit aliquet, libero arcu hendrerit sapien."
//                     image={backgroundImage2}
//                     fixed
//                 />
//                 <OverviewComment />
//                 <GiftProduct />
//                 <ShippingInformation />
//             </div>
//         </main>
//     );
// }

'use client';
import ToggleWife from '@/components/info/toggle-wife';
import Info from '@/components/info/info';
import React, { useState } from 'react';

const HomePage = () => {
    const [bypassPhone, setByPassPhone] = useState(false);
    const [wife, setWife] = useState(false);
    const [error, setError] = useState('');
    const [showFormInfo, setShowFormInfo] = useState(false);

    const showFormWife = () => {
        setWife(true);
    };

    const handleSubmit = () => {
        if (!bypassPhone) {
            setError('Mật Khẩu Chưa Chính Xác. Vui Lòng Thử lại !');
        } else {
            setShowFormInfo(true);
        }
    };
    return (
        <div className="h-svh w-full">
            {wife ? (
                <div className="relative h-full w-full">
                    {showFormInfo ? (
                        <div className="h-full w-full bg-slate-300 p-4">
                            <Info />
                        </div>
                    ) : (
                        <div className="absolute inset-0 h-full w-full bg-slate-950 p-10">
                            <div className="card-style-wife h-full w-full rounded-lg">
                                <div className="flex flex-1 flex-col items-center justify-center">
                                    <div className="form__group field">
                                        <input
                                            type="password"
                                            className="form__field"
                                            placeholder="Wife Password"
                                        />
                                        <label
                                            htmlFor="name"
                                            className="form__label"
                                        >
                                            Nhập Mật Khẩu Wife :
                                        </label>
                                    </div>

                                    <span className="my-2 block text-sm text-red-400">
                                        {error}
                                    </span>

                                    <button
                                        className="group relative overflow-hidden rounded-md border border-b-4 border-gray-400 bg-gray-950 px-4 py-2 font-medium text-gray-400 outline-none duration-300 hover:border-b hover:border-t-4 hover:brightness-150 active:opacity-75"
                                        onClick={handleSubmit}
                                    >
                                        <span className="absolute -top-[150%] left-0 inline-flex h-[5px] w-80 rounded-md bg-gray-400 opacity-50 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)] shadow-gray-400 duration-500 group-hover:top-[150%]"></span>
                                        CONNECT
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-[inherit] flex-col items-center justify-between py-10">
                    <div className="brutalist-card">
                        <div className="brutalist-card__header">
                            <div className="brutalist-card__icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
                                </svg>
                            </div>
                            <div className="brutalist-card__alert font-serif">
                                Wife Không Khả Dụng
                            </div>
                        </div>
                        <div className="brutalist-card__message capitalize">
                            Vui lòng nhập mật khẩu wife để tiếp tục =)))
                        </div>
                        <div className="brutalist-card__actions">
                            <button
                                className="brutalist-card__button brutalist-card__button--mark"
                                onClick={showFormWife}
                            >
                                Okay
                            </button>
                            <a
                                className="brutalist-card__button brutalist-card__button--read"
                                href="#"
                            >
                                Can Sồ Lu
                            </a>
                        </div>
                    </div>
                    <ToggleWife
                        bypassPhone={bypassPhone}
                        setBypassPhone={setByPassPhone}
                    />
                </div>
            )}
        </div>
    );
};

export default HomePage;

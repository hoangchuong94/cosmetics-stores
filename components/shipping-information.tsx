import React from 'react';
import { Truck, ArrowLeft, BaggageClaim } from 'lucide-react';

export default function ShippingInformation() {
    return (
        <div className="flex flex-col justify-center py-20 md:flex md:flex-row">
            <div className="md:grid md:grid-cols-4 md:gap-4">
                <div className="flex flex-col items-center justify-center py-10 md:items-start md:justify-start md:py-0">
                    <p className="text-xs uppercase sm:text-sm">
                        why choose us
                    </p>
                    <span className="mt-4 block w-10 border border-b-red-400"></span>
                </div>
                <div className="mb-2 flex flex-row">
                    <div>
                        <span className="mr-2 block cursor-pointer rounded-full bg-[#d4a6b6] p-2 hover:bg-slate-300">
                            <Truck className="h-4 w-4" />
                        </span>
                    </div>
                    <div>
                        <h4 className="mb-2 text-2xl text-black">
                            EFast Delivery
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                    </div>
                </div>
                <div className="mb-2 flex flex-row">
                    <div>
                        <span className="mr-2 block cursor-pointer rounded-full bg-[#d4a6b6] p-2 hover:bg-slate-300">
                            <BaggageClaim className="h-4 w-4" />
                        </span>
                    </div>
                    <div>
                        <h4 className="mb-2 text-2xl text-black">
                            Free Shipping
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                    </div>
                </div>
                <div className="mb-2 flex flex-row">
                    <div>
                        <span className="mr-2 block cursor-pointer rounded-full bg-[#d4a6b6] p-2 hover:bg-slate-300">
                            <ArrowLeft className="h-4 w-4" />
                        </span>
                    </div>
                    <div>
                        <h4 className="mb-2 text-2xl text-black">
                            Easy Returns
                        </h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Ut elit tellus, luctus nec ullamcorper mattis.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

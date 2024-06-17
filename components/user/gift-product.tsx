import React from 'react';
import Background from '@/components/user/background';
import bg01 from '@/public/static/bg-001.jpg';
import bg02 from '@/public/static/bg-02.jpg';

export default function GiftProduct() {
    return (
        <div className="md:grid md:grid-cols-2 md:gap-4">
            <div>
                <Background
                    title="new collection"
                    name="Awesome Makeup Kit Gift Sets"
                    description="Find your unique style."
                    image={bg01}
                    fixed={false}
                />
            </div>
            <div className="mt-4 md:mt-0">
                <Background
                    title="new collection"
                    name="The Ultimate Skincare Regime"
                    description="Find your unique style."
                    image={bg02}
                    fixed={false}
                />
            </div>
        </div>
    );
}

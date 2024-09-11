import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import LinkHierarchy from './link-hierarchy';

const ControlPanelProducts = async () => {
    return (
        <div className="p-10">
            <LinkHierarchy />
            <div className="my-10">
                <Link href={'/dashboard/product/create'}>
                    <Button>Create Product</Button>
                </Link>
            </div>
        </div>
    );
};

export default ControlPanelProducts;
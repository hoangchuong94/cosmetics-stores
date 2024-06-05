import React from 'react';
import { Home, BarChart2, Settings } from 'lucide-react';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

const menuItems = [
    {
        id: '1',
        name: 'Dashboard',
        icon: <Home className="w-5" />,
        subMenu: [
            {
                id: '1',
                name: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
    {
        id: '2',
        name: 'Users',
        icon: <BarChart2 className="w-5" />,
        subMenu: [
            {
                id: '1',
                name: 'setting',
                href: '/setting',
            },
        ],
    },
    {
        id: '3',
        name: 'Analytics',
        icon: <BarChart2 className="w-5" />,
        subMenu: [
            {
                id: '1',
                name: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
    {
        id: '4',
        name: 'Settings',
        icon: <Settings className="w-5" />,
        subMenu: [
            {
                id: '1',
                name: 'Dashboard',
                href: '/dashboard',
            },
        ],
    },
];
const SideNav = async () => {
    return (
        <div className="min-h-screen">
            <div className="white flex h-screen w-full bg-slate-500/50 p-3">
                <div className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain rounded-3xl bg-gradient-to-r from-indigo-500 to-cyan-950">
                    <div className="grid grid-cols-1 text-white">
                        <div className="flex items-center justify-center p-8">
                            <div className="rounded-md bg-slate-300 p-4">
                                <Home />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideNav;

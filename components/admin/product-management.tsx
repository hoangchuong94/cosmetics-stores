'use client';
import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LinkHierarchy from '@/components/link-hierarchy';
import { ProductDetail } from '@/types';
import { DataTable } from '@/components/data-table/data-table';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableColumnHeader } from '../data-table/data-table-column-header';
import TagList from '@/components/tag-list';

interface ProductManagementProps {
    listProduct: ProductDetail[];
}

export const columns: ColumnDef<ProductDetail>[] = [
    {
        accessorKey: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
    },
    {
        accessorKey: 'price',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Price" />
        ),
    },
    {
        accessorKey: 'quantity',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Quantity" />
        ),
    },
    {
        accessorKey: 'capacity',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Capacity" />
        ),
    },
    {
        accessorKey: 'type',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Type" />
        ),
    },
    {
        accessorKey: 'colors',
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Colors" />;
        },
        cell: ({ row }) => {
            const product = row.original;
            const colors = product.colors.map((item) => item);

            return (
                <TagList tagList={colors} renderItem={(item) => item.name} />
            );
        },
    },

    {
        id: 'actions',
        header: ({ column }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => alert('delete')}>
                            Delete All
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
        cell: ({ row }) => {
            const product = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <DropdownMenuItem>
                                <Link
                                    className="block w-full"
                                    href={`/dashboard/product/update?id=${row.original.id}`}
                                >
                                    <Button
                                        className="w-full hover:no-underline"
                                        variant="link"
                                    >
                                        Update
                                    </Button>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                className="block w-full"
                                href={`/dashboard/product/delete?id=${row.original.id}`}
                            >
                                <Button
                                    className="w-full hover:no-underline"
                                    variant="link"
                                >
                                    Delete
                                </Button>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

const ProductManagement = ({ listProduct }: ProductManagementProps) => {
    return (
        <div className="w-full p-10">
            <LinkHierarchy />
            <div className="relative my-6 space-y-2">
                <div className="absolute left-0 top-0 z-10 block">
                    <Link href={'/dashboard/product/create'}>
                        <Button>Create Product</Button>
                    </Link>
                </div>
                <div className="relative right-0 top-0">
                    <DataTable data={listProduct} columns={columns} />
                </div>
            </div>
        </div>
    );
};

export default ProductManagement;

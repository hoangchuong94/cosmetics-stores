import React from 'react';
import LinkHierarchy from '@/components/admin/link-hierarchy';
import Search from '@/components/search';
import { Separator } from '@/components/ui/separator';

export default function page() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <LinkHierarchy />
        <Search />
      </div>
      <Separator className="mt-6" />
    </div>
  );
}

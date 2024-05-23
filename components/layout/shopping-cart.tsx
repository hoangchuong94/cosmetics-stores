import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { ShoppingBag } from "lucide-react";

export default function ShoppingCard() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex mr-4 md:mr-6">
          <div className="font-sans flex justify-center items-center mr-1 font-bold">
            <p>$</p>
            <span className="text-sm">000.00</span>
          </div>
          <ShoppingBag className="h-6 w-6 text-gray-500" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetClose>close</SheetClose>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

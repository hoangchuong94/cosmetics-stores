'use client';
import { useState } from 'react';
import { Copy, Flag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';

interface ModalProps {
    title: string;
    label: string;
    children: React.ReactNode;
}

const Modal = ({ children, title, label }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DialogTrigger>
            <DialogContent className="h-screen min-w-full bg-black p-10 sm:max-w-[425px]">
                <div className="rounded-md bg-white p-10">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                        </DialogDescription>
                    </DialogHeader>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;

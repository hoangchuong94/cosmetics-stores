'use client';
import { Copy, Flag } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogDescription,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface ModalProps {
    title: string;
    label: string;
    children: React.ReactNode;
}

const Modal = ({ children, title, label }: ModalProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">{label}</Button>
            </DialogTrigger>
            <DialogContent className="min-h-[90%] min-w-[90%] p-10 sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                    </DialogDescription>
                </DialogHeader>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    );
};

export default Modal;

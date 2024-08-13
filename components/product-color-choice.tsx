'use client';
import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    CommandList,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface Color {
    id: string;
    name: string;
    code: string;
}

interface ProductColorOptionsProps {
    listColor: Color[];
}

export function ProductChoice({ listColor }: ProductColorOptionsProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedColors, setSelectedColors] = React.useState<Color[]>([]);

    const handleSelect = (color: Color) => {
        setSelectedColors((prev) =>
            prev.some((selected) => selected.id === color.id)
                ? prev.filter((selected) => selected.id !== color.id)
                : [...prev, color],
        );
        setOpen(true);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-[200px] justify-between uppercase"
                >
                    Select Color
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search color..." />
                    <CommandEmpty>No color found.</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {listColor.map((color) => (
                                <CommandItem
                                    key={color.id}
                                    value={color.name}
                                    onSelect={() => handleSelect(color)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={color.id}
                                            checked={selectedColors.some(
                                                (selected) =>
                                                    selected.id === color.id,
                                            )}
                                            onChange={() => handleSelect(color)}
                                        />
                                        <label
                                            htmlFor={color.id}
                                            className="text-sm font-medium"
                                        >
                                            {color.name}
                                        </label>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
                <Separator />
            </PopoverContent>
        </Popover>
    );
}

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface CustomSelectProps<T> {
    items: T[];
    value: T | null;
    getItemName: (item: T) => string;
    getKey: (item: T) => string | number;
    onChange?: (value: T | null) => void;
    disabled?: boolean;
}

export function CustomSelect<T>({
    items = [],
    value,
    getItemName,
    getKey,
    onChange,
    disabled = false,
}: CustomSelectProps<T>) {
    const [open, setOpen] = React.useState(false);

    const selectedItemName = value ? getItemName(value) : 'Select item...';

    const handleSelect = React.useCallback(
        (currentValue: string) => {
            const selectedItem = items.find(
                (item) => getItemName(item) === currentValue,
            );

            console.log(selectedItem);

            if (onChange) {
                onChange(selectedItem || null);
            }
            setOpen(false);
        },
        [items, getItemName, onChange],
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                >
                    {selectedItemName}
                    <ChevronsUpDown
                        className={cn(
                            'ml-2 h-4 w-4 shrink-0 opacity-50',
                            disabled ? 'opacity-30' : 'opacity-50',
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search..." disabled={disabled} />
                    <CommandList>
                        <CommandEmpty>No items found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={getKey(item)}
                                    value={getItemName(item)}
                                    onSelect={() => {
                                        handleSelect(getItemName(item));
                                    }}
                                    disabled={disabled}
                                >
                                    <Check
                                        className={cn(
                                            'mr-2 h-4 w-4',
                                            value &&
                                                getItemName(value) ===
                                                    getItemName(item)
                                                ? 'opacity-100'
                                                : 'opacity-0',
                                        )}
                                    />
                                    {getItemName(item)}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

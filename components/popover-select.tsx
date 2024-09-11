import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
} from '@/components/ui/command';

interface PopoverSelectProps<T> {
    items: T[];
    renderItem: (item: T) => string;
    getItemKey: (item: T) => string | number;
    value: T | null;
    onChange: (value: T | null) => void;
    placeholder?: string;
    disabled?: boolean;
}

const PopoverSelect = <T,>({
    items = [],
    renderItem,
    getItemKey,
    value,
    onChange,
    placeholder = 'Select item',
    disabled,
}: PopoverSelectProps<T>) => {
    const selectedKey = value ? String(getItemKey(value)) : '';

    return (
        <Select
            value={selectedKey}
            onValueChange={(key) => {
                if (!disabled) {
                    const selectedItem =
                        items.find(
                            (item) => String(getItemKey(item)) === key,
                        ) || null;
                    onChange(selectedItem);
                }
            }}
            disabled={disabled}
        >
            <SelectTrigger
                className={`w-full bg-white ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={disabled}
            >
                <SelectValue className="text-sm" placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandGroup>
                            {items.length > 0 ? (
                                items.map((item) => (
                                    <SelectItem
                                        key={getItemKey(item)}
                                        value={String(getItemKey(item))}
                                        disabled={disabled}
                                    >
                                        {renderItem(item)}
                                    </SelectItem>
                                ))
                            ) : (
                                <CommandEmpty>No items available.</CommandEmpty>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </SelectContent>
        </Select>
    );
};

export default PopoverSelect;

import React from 'react';
import { ChevronsUpDown } from 'lucide-react';
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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import TagList from '@/components/tag-list';

interface SelectProps<T> {
    items: T[];
    field: {
        onChange: (value: T[]) => void;
        value: T[];
    };
    renderItem: (item: T) => string;
    getItemKey: (item: T) => string | number;
}

const Select = <T,>({
    items,
    field,
    renderItem,
    getItemKey,
}: SelectProps<T>) => {
    const [open, setOpen] = React.useState(false);

    const handleSelect = (item: T) => {
        const isSelected = field.value.some(
            (selected) => getItemKey(selected) === getItemKey(item),
        );
        const newSelectedItems = isSelected
            ? field.value.filter(
                  (selected) => getItemKey(selected) !== getItemKey(item),
              )
            : [...field.value, item];

        field.onChange(newSelectedItems);
        setOpen(true);
    };

    return (
        <div className="flex space-x-1">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[200px] justify-between border border-gray-300"
                    >
                        Select Item
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search item..." />
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            <CommandList>
                                {items.map((item) => (
                                    <CommandItem
                                        key={getItemKey(item)}
                                        value={renderItem(item)}
                                        onSelect={() => handleSelect(item)}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id={String(getItemKey(item))}
                                                checked={field.value.some(
                                                    (selected) =>
                                                        getItemKey(selected) ===
                                                        getItemKey(item),
                                                )}
                                                onChange={() =>
                                                    handleSelect(item)
                                                }
                                            />
                                            <label
                                                htmlFor={String(
                                                    getItemKey(item),
                                                )}
                                                className="text-sm font-medium"
                                            >
                                                {renderItem(item)}
                                            </label>
                                        </div>
                                    </CommandItem>
                                ))}
                            </CommandList>
                        </CommandGroup>
                    </Command>
                    <Separator />
                    <div className="p-2">
                        <Button className="w-full bg-slate-500" size="sm">
                            ADD ITEM
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <TagList tagList={field.value} renderItem={renderItem} />
        </div>
    );
};

export default Select;

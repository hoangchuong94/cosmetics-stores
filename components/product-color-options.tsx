'use client';
import React from 'react';
import { ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { Separator } from './ui/separator';
import { SketchPicker } from 'react-color';

interface Color {
    id: string;
    name: string;
    code: string;
}

interface ProductColorOptionsProps {
    listColor: Color[];
}

export function ProductColorOptions({ listColor }: ProductColorOptionsProps) {
    const [open, setOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<Color[]>([]);
    const [visibleStart, setVisibleStart] = React.useState(0);
    const [showColorPicker, setShowColorPicker] = React.useState(false);
    const [newColor, setNewColor] = React.useState('#000000');
    const [colorName, setColorName] = React.useState('');
    const visibleCount = 5;

    const handleSelect = (color: Color) => {
        setSelectedValues((prev) =>
            prev.some((selected) => selected.id === color.id)
                ? prev.filter((selected) => selected.id !== color.id)
                : [...prev, color],
        );
        setOpen(false);
    };

    const handlePagination = (direction: 'next' | 'prev') => {
        setVisibleStart((prev) => {
            const newStart =
                direction === 'next'
                    ? prev + visibleCount
                    : prev - visibleCount;
            return Math.max(
                0,
                Math.min(newStart, selectedValues.length - visibleCount),
            );
        });
    };

    const handleAddColor = () => setShowColorPicker(true);

    const handleSaveColor = () => {
        if (!colorName.trim()) {
            alert('Please enter a color name.');
            return;
        }
        const newColorObject: Color = {
            id: (listColor.length + 1).toString(),
            name: colorName,
            code: newColor,
        };
        listColor.push(newColorObject);
        setSelectedValues([...selectedValues, newColorObject]);
        setShowColorPicker(false);
        setNewColor('#000000');
        setColorName('New Color');
    };

    const visibleValues = selectedValues.slice(
        visibleStart,
        visibleStart + visibleCount,
    );

    return (
        <div className="flex items-center justify-center">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-[200px] justify-between uppercase"
                    >
                        select color
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
                                                checked={selectedValues.some(
                                                    (selected) =>
                                                        selected.id ===
                                                        color.id,
                                                )}
                                                onChange={() =>
                                                    handleSelect(color)
                                                }
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
                    <div className="p-2">
                        <Button
                            className="w-full bg-slate-500"
                            size="sm"
                            onClick={handleAddColor}
                        >
                            ADD COLOR
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <div className="ml-2 flex flex-1 items-center space-x-2 rounded-md">
                {visibleStart > 0 && (
                    <Button
                        className="bg-slate-300"
                        size="sm"
                        onClick={() => handlePagination('prev')}
                    >
                        <ChevronLeft />
                    </Button>
                )}
                {visibleValues.map((color) => (
                    <div
                        key={color.id}
                        style={{ backgroundColor: color.code }}
                        className="h-6 w-6 rounded-full"
                    ></div>
                ))}
                {visibleStart + visibleCount < selectedValues.length && (
                    <Button
                        className="bg-slate-300"
                        size="sm"
                        onClick={() => handlePagination('next')}
                    >
                        <ChevronRight />
                    </Button>
                )}
            </div>
            {showColorPicker && (
                <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
                    <div className="rounded bg-white p-4 shadow-lg">
                        <SketchPicker
                            color={newColor}
                            onChangeComplete={(color) => setNewColor(color.hex)}
                        />
                        <input
                            type="text"
                            value={colorName}
                            onChange={(e) => setColorName(e.target.value)}
                            className="mt-2 w-full border p-1"
                            placeholder="Color name"
                        />
                        <div className="mt-2 flex justify-between">
                            <Button onClick={handleSaveColor}>
                                Save Color
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setShowColorPicker(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

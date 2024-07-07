import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorItem {
    name: string;
    color: string;
}

const ColorPicker: React.FC = () => {
    const [tempColor, setTempColor] = useState<string>('#333333');
    const [colorName, setColorName] = useState<string>('');
    const [colors, setColors] = useState<ColorItem[]>([]);

    const handleColorChange = (color: ColorResult) => {
        setTempColor(color.hex);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColorName(event.target.value);
    };

    const applyColor = () => {
        if (colors.some((item) => item.color === tempColor)) {
            alert('Color already exists!');
        } else if (!colorName) {
            alert('Please enter a color name!');
        } else {
            setColors([...colors, { name: colorName, color: tempColor }]);
            setColorName('');
        }
    };

    return (
        <div className="p-4">
            <SketchPicker color={tempColor} onChange={handleColorChange} />
            <input
                type="text"
                value={colorName}
                onChange={handleNameChange}
                placeholder="Enter color name"
                className="mt-2 rounded border border-gray-300 p-2"
            />
            <div className="mt-4">
                <button
                    onClick={applyColor}
                    className="rounded bg-blue-500 p-2 text-white"
                >
                    Apply
                </button>
            </div>
            <p className="mt-4">Selected Colors:</p>
            <div className="mt-2 flex flex-wrap">
                {colors.map((item, index) => (
                    <div
                        key={index}
                        className="mb-2 mr-2 h-24 w-24 rounded border border-gray-300 p-2"
                        style={{ backgroundColor: item.color }}
                    >
                        <p className="text-center text-white">{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ColorPicker;

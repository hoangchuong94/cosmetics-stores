import { Category, Color } from '@prisma/client';

export const listColors: { id: string; name: string; code: string }[] = [
    { id: '1', name: 'Red', code: '#FF0000' },
    { id: '2', name: 'Green', code: '#00FF00' },
    { id: '3', name: 'Blue', code: '#0000FF' },
    { id: '4', name: 'Yellow', code: '#FFFF00' },
    { id: '5', name: 'Cyan', code: '#00FFFF' },
    { id: '6', name: 'Magenta', code: '#FF00FF' },
    { id: '7', name: 'Orange', code: '#FFA500' },
    { id: '8', name: 'Purple', code: '#800080' },
    { id: '9', name: 'Lime', code: '#00FF00' },
    { id: '10', name: 'Pink', code: '#FFC0CB' },
    { id: '11', name: 'Teal', code: '#008080' },
    { id: '12', name: 'Lavender', code: '#E6E6FA' },
    { id: '13', name: 'Brown', code: '#A52A2A' },
];

export const listCategory = [
    {
        name: 'nam',
        subCategories: [
            {
                name: 'áo',
                detailCategories: [
                    { name: 'áo sơ mi ' },
                    { name: 'áo khoác' },
                    { name: 'áo polo' },
                    { name: 'áo thun' },
                ],
            },
            {
                name: 'quần',
                detailCategories: [
                    { name: 'quần jean' },
                    { name: 'quần sort' },
                ],
            },
        ],
    },
    {
        name: 'Nữ',
        subCategories: [
            {
                name: 'áo',
                detailCategories: [
                    { name: 'áo sơ mi' },
                    { name: 'áo khoác' },
                    { name: 'áo dài' },
                    { name: 'Đầm' },
                ],
            },
            {
                name: 'váy',
                detailCategories: [
                    { name: 'váy đi dạo' },
                    { name: 'váy dạ hội' },
                    { name: 'đồ ngủ' },
                ],
            },
        ],
    },
];

export const listPromotions = [
    {
        name: 'Giảm giá mùa hè',
        description: 'Khuyến mãi lớn cho mùa hè với giảm giá lên đến 50%!',
        startDay: new Date('2024-06-01'),
        endDay: new Date('2024-08-31'),
    },
    {
        name: 'Khuyến mãi Tết',
        description: 'Giảm giá đặc biệt cho dịp Tết Nguyên Đán.',
        startDay: new Date('2024-01-10'),
        endDay: new Date('2024-01-25'),
    },
    {
        name: 'Khuyến mãi Black Friday',
        description: 'Giảm giá cực sốc trong ngày Black Friday.',
        startDay: new Date('2024-11-24'),
        endDay: new Date('2024-11-26'),
    },
];

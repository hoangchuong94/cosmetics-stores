import { Marcellus, Lusitana, Lato } from 'next/font/google';

export const marcellus = Marcellus({
    variable: '--font-marcellus',
    subsets: ['latin'],
    weight: ['400'],
    display: 'swap',
    fallback: ['sans-serif', 'arial'],
});

export const lato = Lato({
    subsets: ['latin'],
    weight: ['100', '300', '400', '700', '900'],
    display: 'swap',
    style: ['normal', 'italic'],
    fallback: ['sans-serif', 'arial'],
});

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
});

import { StaticImageData } from 'next/image';

export enum UserRole {
    USER,
    ADMIN,
}

export enum Status {
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
}

export type LoginErrorField = {
    email?: string[];
    password?: string[];
};

export type RegisterErrorField = {
    name?: string[];
    email?: string[];
    password?: string[];
    passwordConfirm?: string[];
};

export type MessageLogin = {
    errors?: LoginErrorField;
    message: string | null;
    type: Status;
};

export type MessageRegister = {
    errors?: RegisterErrorField;
    message: string | null;
    type: Status;
};

export type Product = {
    id: string;
    name: string;
    image: StaticImageData;
    description: string;
    price: number;
    sale: number;
    star: number;
};

import { LoginSchema, RegisterSchema } from '@/schema/index';
import { MessageRegister, MessageLogin, Status } from '@/types';

export const validateFormLogin = (
    formData: FormData,
): MessageLogin | undefined => {
    const formValid = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!formValid.success) {
        return {
            errors: formValid.error.flatten().fieldErrors,
            message: null,
            type: Status.ERROR,
        };
    }
};

export const validateFormRegister = (
    formData: FormData,
): MessageRegister | undefined => {
    const formValid = RegisterSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        passwordConfirm: formData.get('passwordConfirm'),
    });

    if (!formValid.success) {
        return {
            errors: formValid.error.flatten().fieldErrors,
            message: null,
            type: Status.ERROR,
        };
    }
};

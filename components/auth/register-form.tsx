'use client';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { RegisterSchema } from '@/schema/index';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { InputField } from '@/components/custom-field';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { register } from '@/actions/auth';

import { ArrowRight } from 'lucide-react';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import AuthCardWrapper from '@/components/auth-card-wrapper';

export default function RegisterForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            passwordConfirm: '',
        },
    });

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError('');
        setSuccess('');
        startTransition(() => {
            register(values).then((data) => {
                if (data?.error) {
                    form.reset();
                    setError(data.error);
                }
                if (data?.success) {
                    form.reset();
                    setSuccess(data.success);
                }
            });
        });
    };

    return (
        <AuthCardWrapper
            className="h-full md:rounded-l-none md:rounded-r-3xl"
            headerLabel="Register"
            footerLabel="You Have An Account ? "
            footerHref="/login"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                        />
                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                        />
                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="passwordConfirm"
                            label="Password Confirm"
                            placeholder="Enter your passwordConfirm"
                            type="password"
                        />
                    </div>

                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button
                        className="mt-6 w-full"
                        aria-disabled={isPending}
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <p>Register</p>
                                <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>
        </AuthCardWrapper>
    );
}

'use client';
import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import githubIcon from '/public/icon/github-icon.svg';
import googleIcon from '/public/icon/google-icon.svg';

import { ArrowRight } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { authenticate } from '@/actions/auth';
import { LoginSchema } from '@/schema/index';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { InputField } from '@/components/custom-field';
import AuthCardWrapper from '@/components/auth-card-wrapper';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';

export default function LoginForm() {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl');
    const urlError =
        searchParams.get('error') === 'OAuthAccountNotLinked'
            ? 'Email already in use with different providers!'
            : '';

    const signInProvider = (provider: string) => {
        signIn(provider, {
            callbackUrl: callbackUrl || '/',
        });
    };

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError('');
        setSuccess('');

        startTransition(() => {
            authenticate(values, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                })
                .catch(() => setError('Something went wrong'));
        });
    };

    return (
        <AuthCardWrapper
            className="flex h-full min-w-full flex-col justify-center md:rounded-l-none md:rounded-r-3xl"
            headerLabel="Login"
            footerLabel="Do not have an account ? "
            footerHref="/register"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="email"
                            label="Email"
                            placeholder="Enter your email address"
                            type="email"
                        />
                        <InputField
                            control={form.control}
                            className="border border-gray-800"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </div>

                    <Link
                        href="/forgot-password"
                        className="float-right block py-4 text-sm text-blue-500 hover:text-blue-700"
                    >
                        You forgot password ?
                    </Link>

                    <Button
                        className="w-full"
                        aria-disabled={isPending}
                        disabled={isPending}
                        type="submit"
                    >
                        {isPending ? (
                            <LoadingSpinner />
                        ) : (
                            <>
                                <p>Login</p>
                                <ArrowRight className="ml-auto h-5 w-5 text-gray-50" />
                            </>
                        )}
                    </Button>
                </form>
            </Form>

            <FormError message={error || urlError} />
            <FormSuccess message={success} />

            <div className="my-3 flex items-center justify-center">
                <span className="w-full border border-b-black"></span>
                <p className="mx-1">OR</p>
                <span className="w-full border border-b-black"></span>
            </div>

            <div className="grid grid-cols-2 gap-2">
                <Button
                    className="h-16"
                    variant={'outline'}
                    onClick={() => signInProvider('google')}
                >
                    <Image
                        src={googleIcon}
                        alt="google icon"
                        width={30}
                        height={30}
                        priority
                    />
                </Button>
                <Button
                    className="h-16"
                    variant={'outline'}
                    onClick={() => signInProvider('github')}
                >
                    <Image
                        src={githubIcon}
                        alt="github icon"
                        width={30}
                        height={30}
                        priority
                    />
                </Button>
            </div>
        </AuthCardWrapper>
    );
}

'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useState, useTransition } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

import { newVerificationEmail } from '@/actions/new-verification';
import { Button } from '@/components/ui/button';
import MessageForm from '@/components/auth/message-form';
import Link from 'next/link';
import PageTitle from '@/components/page-title';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

export default function NewVerificationPage() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const tokenParam = searchParams.get('token');
  const [isPending, startTransition] = useTransition();

  const handlerVerificationEmail = () => {
    setError('');
    setSuccess('');

    startTransition(() => {
      if (!tokenParam) {
        setError('Missing token!');
        return;
      }

      newVerificationEmail(tokenParam)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError('Something went wrong!');
        });
    });
  };

  return (
    <>
      <div className="flex flex-col">
        <PageTitle label="Authentication Email" className="my-8" />

        <div className="mt-2">
          {success ? (
            <>
              <FormSuccess message={success} />
              <Link href={'/login'} className="my-4 block text-center">
                Click{' '}
                <span className="border-b-2 border-b-blue-800 text-blue-600">
                  here
                </span>{' '}
                to return to the login page
              </Link>
            </>
          ) : (
            <Button
              disabled={isPending}
              onClick={handlerVerificationEmail}
              className="w-full"
            >
              Click here to verification email
            </Button>
          )}
          <FormError message={error} />
        </div>
      </div>
    </>
  );
}

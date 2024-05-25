"use client";
import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ArrowRight } from "lucide-react";
import githubIcon from "/public/icon/github-icon.svg";
import googleIcon from "/public/icon/google-icon.svg";

import { authenticate } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/schema/index";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import PageTitle from "@/components/page-title";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import LoadingSpinner from "@/components/loading-spinner";

export default function LoginForm() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different providers!"
      : "";

  const signInProvider = (provider: string) => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

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
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <>
      <PageTitle label="Login" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-800"
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border border-gray-800"
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Link
            href="/forgot-password"
            className="float-right text-sm text-blue-500 hover:text-blue-700"
          >
            Forgot password?
          </Link>

          <Button
            className={`mt-6 w-full ${isPending && "bg-gray-700"}`}
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
        <span className="w-full border  border-b-black"></span>
        <p className="mx-1">OR</p>
        <span className="w-full border border-b-black"></span>
      </div>
      <div className="flex py-1">
        <Button
          className="flex w-full justify-center border-2 border-solid border-b-gray-50 bg-slate-50/55 py-8 hover:bg-slate-300  hover:transition-all active:bg-slate-100"
          onClick={() => signInProvider("google")}
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
          className="flex w-full justify-center border-2 border-solid border-b-gray-50 bg-slate-50/55 py-8 hover:bg-slate-300  hover:transition-all active:bg-slate-100"
          onClick={() => signInProvider("github")}
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
      <RegisterButton />
    </>
  );
}

function RegisterButton() {
  return (
    <Link
      href={"/register"}
      className="my-4 flex w-full items-center justify-center text-sm"
    >
      <p className="text-black">
        Do not have an account ?{" "}
        <span className="text-blue-500 active:opacity-5">click here</span>
      </p>
    </Link>
  );
}

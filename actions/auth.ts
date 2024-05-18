"use server";
import prisma from "@/lib/prisma";
import * as z from "zod";
import { signIn } from "@/auth";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { LoginSchema, RegisterSchema } from "@/schema/index";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function authenticate(
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || !user.email || !user.password) {
    return { error: "Email does not exist!" };
  }

  if (user && !user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email);

    if (verificationToken) {
      await sendVerificationEmail({
        email: verificationToken.email,
        token: verificationToken.token,
      });
      return {
        success:
          "Confirmation email sent successfully. Please check your email",
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  } finally {
    prisma.$disconnect();
  }
}

export async function register(values: z.infer<typeof RegisterSchema>) {
  try {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await hash(password, 12);

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const verificationEmail = await generateVerificationToken(email);

    if (verificationEmail) {
      await sendVerificationEmail({
        email: verificationEmail.email,
        token: verificationEmail.token,
      });
    }

    return {
      success: "Confirmation email sent successfully. Please check your email",
    };
  } catch (error) {
    console.error("Error during registration:", error);
    return {
      error: "Database Error: Failed to register user.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

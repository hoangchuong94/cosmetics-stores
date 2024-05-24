import type { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prisma";
import argon2 from "argon2";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import facebook from "next-auth/providers/facebook";
import credentials from "next-auth/providers/credentials";

export default {
  providers: [
    google,
    github,
    facebook,
    credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (
          !user ||
          !(await argon2.verify(String(credentials.password), user.password!))
        ) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

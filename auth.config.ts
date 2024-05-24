import type { NextAuthConfig } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
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
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

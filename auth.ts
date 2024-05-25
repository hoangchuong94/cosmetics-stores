import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import Prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";
import google from "next-auth/providers/google";
import github from "next-auth/providers/github";
import facebook from "next-auth/providers/facebook";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    google,
    github,
    facebook,
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        const user = await Prisma.user.findUnique({
          where: {
            email: String(credentials.email),
          },
        });

        if (
          !user ||
          !(await bcryptjs.compare(
            String(credentials.password),
            user.password!
          ))
        ) {
          return null;
        }
        return user;
      },
    }),
  ],
});

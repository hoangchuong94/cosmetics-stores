import prisma from "@/lib/prisma";

import type { NextAuthConfig } from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isPublicRoute = publicRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      const isAuthRoute = authRoutes.includes(nextUrl.pathname);

      if (nextUrl.pathname === "/") return true;

      if (isApiAuthRoute) {
        if (nextUrl.href.includes("error")) {
          return false;
        }
        return true;
      }

      if (isAuthRoute) {
        if (isLoggedIn) {
          return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return true;
      }

      if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
          callbackUrl += nextUrl.search;
        }

        const encodedUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(
          new URL(`/login?callbackUrl=${encodedUrl}`, nextUrl)
        );
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user && token.sub) {
        const exitingUser = await prisma.user.findUnique({
          where: {
            id: token.sub,
          },
        });
        if (exitingUser) {
          token.role = exitingUser.role;
        }
        return token;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        return { ...session, user: session.user, role: token.role };
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      if (user && user.id) {
        const exitingUser = await prisma.user.findUnique({
          where: {
            id: user.id,
          },
        });

        if (!exitingUser?.emailVerified) {
          return false;
        }
      }

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  providers: [],
} satisfies NextAuthConfig;

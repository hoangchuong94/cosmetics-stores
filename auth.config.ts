import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
      const isAuthRoute = authRoutes.includes(nextUrl.pathname);
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);

      if (isLoggedIn) {
        if (auth.user.role === "USER" && isApiAuthRoute) {
          return true;
        } else if (auth.user.role === "USER" && !isPublicRoute) {
          return Response.redirect(new URL("/feedback", nextUrl));
        }
      }

      if (isApiAuthRoute) {
        if (nextUrl.href.includes("error")) {
          let error = nextUrl.search;
          return Response.redirect(new URL(`/login${error}`, nextUrl));
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
    jwt: async ({ token, user }) => {
      if (user && token.sub) {
        token.role = user.role;
        return token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role;
        return session;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
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
    linkAccount: async ({ user }) => {
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

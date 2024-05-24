import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
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
    session: async ({ session, token }) => {
      if (token.sub) {
        return { ...session, user: session.user, role: token.role };
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
});

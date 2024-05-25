"use client";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const currentUser = useSession();
  return currentUser.data?.user;
};

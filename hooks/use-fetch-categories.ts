import useSWR from "swr";
import { fetcher } from "@/lib/api";
import { Category } from "@prisma/client";

export const useFetchCategories = () => {
  const pathKey = `/api/categories`;
  const { data, error } = useSWR(pathKey, fetcher, {
    refreshInterval: 10000,
  });

  return {
    data: (data?.categories as Category[]) || [],
    loading: !error && !data,
    error: error,
  };
};

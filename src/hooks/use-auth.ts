"use client";

import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useAuth(): {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: "admin" | "staff" | "patient";
  name?: string;
} {
  const { data, isLoading } = useSWR("/api/token", fetcher);

  return {
    isAuthenticated: data?.isAuthenticated ?? false,
    isLoading,
    role: data?.role,
    name: data?.name,
  };
}

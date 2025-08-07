"use client";
import useSWR from "swr";
import { useUser } from "@/contexts/AuthContext";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) return [];          // 401 → empty list
  return res.json();               // should be array
};

export default function useTransactions() {
  const { user } = useUser();
  const shouldFetch = !!user;      // avoid call before login

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/transactions" : null,
    fetcher
  );

  // ensure we *always* hand back an array
  const transactions = Array.isArray(data) ? data : [];

  return { transactions, isLoading, error, mutate };
}

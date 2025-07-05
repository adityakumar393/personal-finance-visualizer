"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useTransactions() {
  const {
    data: transactions,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/transactions", fetcher);

  return { transactions: transactions || [], isLoading, error, mutate };
}

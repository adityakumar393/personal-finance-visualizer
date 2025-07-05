"use client";
import useSWR from "swr";
import { currentMonthId } from "@/lib/budget";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useBudgets(month = currentMonthId()) {
  const key = `/api/budgets?month=${month}`;
  const { data, error, isLoading, mutate } = useSWR(key, fetcher);

  return { budgets: data || [], isLoading, error, mutate };
}

// src/hooks/useBudgets.js
"use client";

import useSWR from "swr";
import { currentMonthId } from "@/lib/budget";
import { useUser } from "@/contexts/AuthContext";

/* generic fetcher that never throws; non-200 ⇒ [] */
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) return [];
  return res.json(); // expected array
};

/**
 * React hook to get budgets for a month (default = current month).
 * Returns an *array* in all cases so UI never crashes.
 */
export default function useBudgets(month = currentMonthId()) {
  const { user } = useUser();
  const shouldFetch = !!user; // wait until login

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? `/api/budgets?month=${month}` : null,
    fetcher
  );

  const budgets = Array.isArray(data) ? data : [];
  return { budgets, isLoading, error, mutate };
}

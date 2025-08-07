// src/components/TransactionTable.js
"use client";

import useTransactions from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TransactionTable({ limit }) {
  const { transactions, isLoading, mutate } = useTransactions();
  const [error, setError] = useState(null);

  if (isLoading) return <p>Loading…</p>;

  // newest → oldest
  let rows = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  if (limit) rows = rows.slice(0, limit);

  if (!rows.length) return <p>No transactions yet.</p>;

  async function handleDelete(id) {
    // optimistic update
    const previous = transactions;
    mutate(transactions.filter((t) => t._id !== id), false);

    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await mutate(); // re-validate
    } catch (err) {
      setError(err.message);
      mutate(previous, false); // rollback
    }
  }

  return (
    <>
      {error && (
        <p className="text-sm text-red-600 mb-2">
          {error} – please refresh and try again.
        </p>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="p-2">Date</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Category</th>
            <th className="p-2">Description</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {rows.map((t) => (
            <tr key={t._id} className="border-b">
              <td className="p-2">{t.date}</td>
              <td className="p-2">{t.amount}</td>
              <td className="p-2">{t.category}</td>
              <td className="p-2">{t.description}</td>
              <td className="p-2">
                <Button variant="ghost" onClick={() => handleDelete(t._id)}>
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

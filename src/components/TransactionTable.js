"use client";
import useTransactions from "@/hooks/useTransactions";
import { Button } from "@/components/ui/button";

export default function TransactionTable() {
  const { transactions, isLoading, mutate } = useTransactions();

  if (isLoading) return <p>Loading…</p>;
  if (!transactions.length) return <p>No transactions yet.</p>;

  async function handleDelete(id) {
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    mutate();
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Date</th>
          <th className="p-2">Amount</th>
          <th className="p-2">Description</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <tr key={t._id} className="border-b">
            <td className="p-2">{t.date}</td>
            <td className="p-2">{t.amount}</td>
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
  );
}

"use client";
import useTransactions from "@/hooks/useTransactions";
import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCards() {
  const { transactions } = useTransactions();

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + Math.abs(t.amount), 0);

  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card><CardContent className="p-4">
        <p className="text-sm opacity-70">Total Expenses</p>
        <p className="text-2xl font-semibold mt-2">₹{totalExpense}</p>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <p className="text-sm opacity-70">Total Income</p>
        <p className="text-2xl font-semibold mt-2">₹{totalIncome}</p>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <p className="text-sm opacity-70">Net Balance</p>
        <p className="text-2xl font-semibold mt-2">₹{totalIncome - totalExpense}</p>
      </CardContent></Card>
    </div>
  );
}

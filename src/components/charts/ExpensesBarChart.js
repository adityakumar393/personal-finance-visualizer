"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useTransactions from "@/hooks/useTransactions";

export default function ExpensesBarChart() {
  const { transactions } = useTransactions();
  if (!transactions.length) return null;

  // Aggregate by YYYY-MM string
  const grouped = {};
  transactions.forEach(({ date, amount }) => {
    if (amount >= 0) return; // only expenses
    const month = date.slice(0, 7);
    grouped[month] = (grouped[month] || 0) + Math.abs(amount);
  });
  const data = Object.entries(grouped)
    .map(([month, total]) => ({ month, total }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#ef4444" />   {/* red-500 Tailwind hex */}
      </BarChart>
    </ResponsiveContainer>
  );
}

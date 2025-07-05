"use client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useTransactions from "@/hooks/useTransactions";
import { CATEGORIES } from "@/lib/categories";

const COLORS = ["#f87171","#fb923c","#fbbf24","#34d399","#60a5fa","#a78bfa","#f472b6","#4ade80","#94a3b8"];

export default function CategoryPieChart() {
  const { transactions } = useTransactions();
  if (!transactions.length) return null;

  const totals = CATEGORIES.map((cat) => ({
    name: cat,
    value: transactions
      .filter((t) => t.category === cat && t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),
  })).filter((d) => d.value > 0);

  if (!totals.length) return <p>No expenses yet.</p>;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie dataKey="value" data={totals} cx="50%" cy="50%" outerRadius={100}>
          {totals.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}

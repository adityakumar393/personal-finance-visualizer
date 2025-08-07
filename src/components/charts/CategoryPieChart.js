// src/components/charts/CategoryPieChart.js
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

const COLORS = [
  "#f87171", "#fb923c", "#fbbf24",
  "#34d399", "#60a5fa", "#a78bfa",
  "#f472b6", "#4ade80", "#94a3b8",
];

/**
 * @param {{ month?: string }} props
 *        month → "YYYY-MM" (e.g. "2025-07"); if omitted, aggregates all data.
 */
export default function CategoryPieChart({ month }) {
  const { transactions } = useTransactions();
  if (!transactions.length) return null;

  // filter by month and negative amounts (expenses)
  const filtered = transactions.filter(
    (t) => t.amount < 0 && (!month || t.date.startsWith(month))
  );

  const totals = CATEGORIES.map((cat) => ({
    name: cat,
    value: filtered
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0),
  })).filter((d) => d.value > 0);

  if (!totals.length)
    return <p>{month ? "No expenses this month." : "No expenses yet."}</p>;

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

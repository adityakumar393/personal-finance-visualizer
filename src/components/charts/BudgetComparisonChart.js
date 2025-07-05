"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useBudgets from "@/hooks/useBudgets";
import useTransactions from "@/hooks/useTransactions";
import { CATEGORIES } from "@/lib/categories";
import { currentMonthId } from "@/lib/budget";

export default function BudgetComparisonChart({ month = currentMonthId() }) {
  const { budgets } = useBudgets(month);
  const { transactions } = useTransactions();           // whole list

  // Build { category → budgetAmount }
  const budgetMap = {};
  budgets.forEach((b) => (budgetMap[b.category] = b.amount));

  // Build { category → actualExpense }
  const actualMap = {};
  transactions
    .filter((t) => t.date.startsWith(month) && t.amount < 0)
    .forEach((t) => {
      actualMap[t.category] = (actualMap[t.category] || 0) + Math.abs(t.amount);
    });

  // Merge into recharts data array
  const data = CATEGORIES.map((cat) => ({
    category: cat,
    Budget: budgetMap[cat] || 0,
    Actual: actualMap[cat] || 0,
  })).filter((d) => d.Budget || d.Actual); // hide empty rows

  if (!data.length) return <p>No data for {month}.</p>;

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Budget" fill="#60a5fa" />
        <Bar dataKey="Actual" fill="#f87171" />
      </BarChart>
    </ResponsiveContainer>
  );
}

"use client";
import { Card, CardContent } from "@/components/ui/card";
import useBudgets from "@/hooks/useBudgets";
import useTransactions from "@/hooks/useTransactions";
import { currentMonthId } from "@/lib/budget";

export default function InsightsCard({ month = currentMonthId() }) {
  const { budgets } = useBudgets(month);
  const { transactions } = useTransactions();

  // Map category -> { budget, spent }
  const map = {};
  budgets.forEach((b) => (map[b.category] = { budget: b.amount, spent: 0 }));

  transactions
    .filter((t) => t.date.startsWith(month) && t.amount < 0)
    .forEach((t) => {
      const entry = map[t.category] || { budget: 0, spent: 0 };
      entry.spent += Math.abs(t.amount);
      map[t.category] = entry;
    });

  const alerts = Object.entries(map)
    .filter(([_, v]) => v.budget && v.spent > v.budget * 0.8) // >80 %
    .map(([cat, v]) => ({
      cat,
      pct: Math.round((v.spent / v.budget) * 100),
    }));

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium">Insights ({month})</h3>
        {!alerts.length && <p className="text-sm opacity-70">All good. 🎉</p>}
        {alerts.map((a) => (
          <p key={a.cat} className="text-sm">
            <span className="font-semibold">{a.cat}</span> is at{" "}
            <span className="text-red-600">{a.pct}%</span> of its budget.
          </p>
        ))}
      </CardContent>
    </Card>
  );
}

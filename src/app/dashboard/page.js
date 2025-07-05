// src/app/dashboard/page.js
"use client";

import { useState } from "react";
import { currentMonthId } from "@/lib/budget";

import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryPieChart from "@/components/charts/CategoryPieChart";
import TransactionTable from "@/components/TransactionTable";

import AddBudgetDialog from "@/components/dashboard/AddBudgetDialog";
import MonthPicker from "@/components/dashboard/MonthPicker";

import BudgetComparisonChart from "@/components/charts/BudgetComparisonChart";
import InsightsCard from "@/components/dashboard/InsightsCard";

export default function Dashboard() {
  // month in YYYY-MM format (defaults to the current month)
  const [month, setMonth] = useState(currentMonthId());

  return (
    <div className="space-y-8">
      {/* KPI cards */}
      <SummaryCards />

      {/* Budgets header row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Budgets</h2>

        {/* Month picker + “Set Budget” dialog */}
        <div className="flex items-center gap-4">
          <MonthPicker month={month} onChange={setMonth} />
          <AddBudgetDialog defaultMonth={month} />
        </div>
      </div>

      {/* Charts + insights for the selected month */}
      <BudgetComparisonChart month={month} />
      <InsightsCard month={month} />

      {/* Category breakdown & recent transactions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
          <CategoryPieChart />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
          <TransactionTable limit={5} />
        </div>
      </div>
    </div>
  );
}

import TransactionForm from "@/components/forms/TransactionForm";
import TransactionTable from "@/components/TransactionTable";
import ExpensesBarChart from "@/components/charts/ExpensesBarChart";

export default function Home() {
  return (
   <div className="grid gap-6 lg:grid-cols-2">

      {/* Left column: form + table */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Add Transaction</h2>
        <TransactionForm />

        <h2 className="text-xl font-semibold">Transactions</h2>
        <TransactionTable />
      </div>

      {/* Right column: chart */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
        <ExpensesBarChart />
      </div>
    </div>
  );
}

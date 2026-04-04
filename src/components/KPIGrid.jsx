import { useDashboard } from "../context/DashboardContext";

export default function KPIGrid() {
  const { transactions } = useDashboard();

  const expenses = transactions.filter((t) => t.type === "expense");
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + Number(t.amount), 0);
  const expenseTotal = expenses.reduce((s, t) => s + Number(t.amount), 0);

  const savingsRate =
    incomeTotal > 0
      ? Math.round(((incomeTotal - expenseTotal) / incomeTotal) * 100)
      : 0;

  const categoryTotals = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const avgExpense =
    expenses.length > 0 ? Math.round(expenseTotal / expenses.length) : 0;

  const cards = [
    {
      label: "Highest spending category",
      value: topCategory ? topCategory[0] : "—",
      sub: topCategory ? `₹${topCategory[1].toLocaleString("en-IN")} total` : "No expense data yet",
    },
    {
      label: "Savings rate",
      value: incomeTotal > 0 ? `${savingsRate}%` : "—",
      sub:
        incomeTotal === 0
          ? "No income data"
          : savingsRate >= 50
          ? "✓ Healthy savings pace"
          : "⚠ Below 50% — watch spending",
    },
    {
      label: "Avg expense per transaction",
      value: expenses.length > 0 ? `₹${avgExpense.toLocaleString("en-IN")}` : "—",
      sub:
        expenses.length > 0
          ? `Over ${expenses.length} transactions`
          : "No expenses recorded",
    },
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-4">
      {cards.map((c) => (
        <div
          key={c.label}
          className="
            bg-card border border-border
            p-6 rounded-card
            shadow-lg shadow-accent/10
          "
        >
          <p className="text-xs text-textSecondary uppercase tracking-wide">
            {c.label}
          </p>
          <h2 className="text-2xl font-bold text-accent mt-2">{c.value}</h2>
          <p className="text-sm text-textSecondary mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}
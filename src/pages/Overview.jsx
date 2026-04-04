import { useDashboard } from "../context/DashboardContext";
import SummaryCards from "../components/SummaryCards";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import IncomeExpenseChart from "../components/charts/IncomeExpenseChart";
import SpendingBreakdown from "../components/charts/SpendingBreakdown";

export default function Overview() {
  const { transactions } = useDashboard();

  // Build monthly data from actual transactions
  const monthMap = {};
  transactions.forEach((t) => {
    const key = t.date.slice(0, 7); // "2026-01"
    if (!monthMap[key]) monthMap[key] = { month: key, income: 0, expense: 0 };
    if (t.type === "income") monthMap[key].income += Number(t.amount);
    else monthMap[key].expense += Number(t.amount);
  });

  const chartData = Object.values(monthMap)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6)
    .map((d) => ({
      ...d,
      // Short label: "Jan '26"
      month: new Date(d.month + "-01").toLocaleDateString("en-IN", {
        month: "short",
        year: "2-digit",
      }),
    }));

  return (
    <div className="space-y-6">
      <SummaryCards />
      <BalanceTrendChart data={chartData} />
      <SpendingBreakdown />
      <IncomeExpenseChart data={chartData} />
    </div>
  );
}
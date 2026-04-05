import { useDashboard } from "../../context/DashboardContext";
import { BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import EmptyState from "../EmptyState";

export default function CategoryBarChart() {
  const { transactions } = useDashboard();

  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(categoryTotals).map(([category, value]) => ({ category, value }));

  if (data.length === 0) {
    return <EmptyState icon="*" message="No category data" sub="Expense transactions will appear here." />;
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} layout="vertical">
       <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
              strokeOpacity={0.2}
            />
        <XAxis type="number" stroke="#9CA3AF" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
        <YAxis dataKey="category" type="category" stroke="#9CA3AF" tickLine={false} axisLine={false} width={80} />
        <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`, "Spent"]} />
        <Bar dataKey="value" fill="#e05a7a" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
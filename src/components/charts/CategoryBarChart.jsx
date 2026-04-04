import { useDashboard } from "../../context/DashboardContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CategoryBarChart() {
  const { transactions } = useDashboard();

  const categoryTotals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        t.amount;
    });

  const data = Object.entries(
    categoryTotals
  ).map(([category, value]) => ({
    category,
    value,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>

      <BarChart
        data={data}
        layout="vertical"
      >

        <XAxis type="number" />

        <YAxis
          dataKey="category"
          type="category"
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#e05a7a"
        />

      </BarChart>

    </ResponsiveContainer>
  );
}
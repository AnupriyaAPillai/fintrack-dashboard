import { useDashboard } from "../../context/DashboardContext";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MonthlyBarChart() {
  const { transactions } = useDashboard();

  const months = {};

  transactions.forEach((t) => {
    const m = t.date.slice(0, 7);

    if (!months[m])
      months[m] = {
        month: m,
        income: 0,
        expense: 0,
      };

    months[m][t.type] += t.amount;
  });

  const data = Object.values(months);

  return (
    <ResponsiveContainer width="100%" height={260}>

      <BarChart data={data}>

        <XAxis dataKey="month" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="income"
          fill="#A23D5D"
        />

        <Bar
          dataKey="expense"
          fill="#DE6189"
        />

      </BarChart>

    </ResponsiveContainer>
  );
}
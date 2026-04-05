import { useDashboard } from "../../context/DashboardContext";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import EmptyState from "../EmptyState";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value;
  const saved = val >= 0;
  return (
    <div style={{
      background: "var(--color-card)",
      border: `1px solid ${saved ? "rgba(52,211,153,0.3)" : "rgba(251,113,133,0.3)"}`,
      borderRadius: "10px",
      padding: "10px 14px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    }}>
      <p style={{ color: "var(--color-text-secondary)", fontSize: "11px", marginBottom: 4 }}>{label}</p>
      <p style={{ color: saved ? "#34d399" : "#fb7185", fontWeight: 700, fontSize: "15px" }}>
        {saved ? "+" : ""}₹{val.toLocaleString("en-IN")}
      </p>
      <p style={{ color: "var(--color-text-secondary)", fontSize: "11px", marginTop: 2 }}>
        {saved ? "Surplus" : "Deficit"}
      </p>
    </div>
  );
};

export default function MonthlySavingsChart() {
  const { transactions } = useDashboard();

  const months = {};
  transactions.forEach((t) => {
    const m = t.date.slice(0, 7);
    if (!months[m]) months[m] = { month: m, income: 0, expense: 0 };
    if (t.type === "income") months[m].income += Number(t.amount);
    else months[m].expense += Number(t.amount);
  });

  const data = Object.values(months)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((d) => ({
      month: new Date(d.month + "-01").toLocaleDateString("en-IN", { month: "short", year: "2-digit" }),
      savings: d.income - d.expense,
    }));

  if (data.length === 0) {
    return <EmptyState icon="*" message="No savings data yet" sub="Add transactions to see your monthly savings." />;
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 4, left: 0, bottom: 0 }}>
         <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
              strokeOpacity={0.2}
            />
        <XAxis
          dataKey="month"
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          stroke="#9CA3AF"
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => `₹${v / 1000}k`}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(162,61,93,0.06)" }} />
        {/* Zero reference line */}
        <ReferenceLine y={0} stroke="var(--color-text-secondary)" strokeOpacity={0.4} strokeWidth={1} />
        <Bar dataKey="savings" radius={[4, 4, 0, 0]} maxBarSize={40}>
          {data.map((entry, index) => (
            <Cell
              key={index}
              fill={entry.savings >= 0 ? "#34d399" : "#fb7185"}
              fillOpacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
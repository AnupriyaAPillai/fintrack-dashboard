import { useDashboard } from "../../context/DashboardContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import EmptyState from "../EmptyState";

const COLORS = [
  "#A23D5D",
  "#DE6189",
  "#F7A4BE",
  "#F33370",
  "#DC87A2",
  "#6D0425",

  "#C94F74",
  "#E57A9C",
  "#B03052",
  "#8E2A48",
  "#F26C96",
  "#D94C78",
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;
  return (
    <div className="bg-card border border-border px-3 py-2 rounded text-sm">
      <div className="font-medium">{item.name}</div>
      <div>₹{item.value.toLocaleString("en-IN")}</div>
    </div>
  );
};

export default function SpendingBreakdown() {
  const { transactions } = useDashboard();

  const categoryTotals = {};
  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Number(t.amount);
    });

  const total = Object.values(categoryTotals).reduce((a, b) => a + b, 0);
  const data = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    percent: Math.round((value / total) * 100),
  }));

  return (
    <div className="bg-card border border-border p-6 rounded-card shadow-lg shadow-accent/10">
      <h3 className="text-accent mb-4">Spending Breakdown — By category</h3>

      {data.length === 0 ? (
        <EmptyState icon="*" message="No spending data yet" sub="Add some expense transactions to see your breakdown." />
      ) : (
        <div className="flex items-center justify-center gap-12 flex-wrap">
          <div className="w-[280px] h-[280px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" innerRadius={80} outerRadius={110} paddingAngle={2}>
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col gap-3">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between w-[220px]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: COLORS[index] }} />
                  <span className="text-textPrimary">{item.name}</span>
                </div>
                <span className="text-textSecondary">{item.percent}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
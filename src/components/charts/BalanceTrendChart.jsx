import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import EmptyState from "../EmptyState";

export default function BalanceTrendChart({ data }) {
  return (
    <div
      className="
        bg-card
        border border-border
        p-6
        rounded-card
        shadow-lg
        shadow-accent/10
      "
    >
      <h3 className="text-accent mb-4">
        Balance Trend - last 6 months
      </h3>

      {!data || data.length === 0 ? (
        <EmptyState
          icon="*"
          message="No trend data yet"
          sub="Add transactions to see your balance trend."
        />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>

          <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
              strokeOpacity={0.2}
            />

            <XAxis dataKey="month" stroke="#9CA3AF" tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />

            <Tooltip />

            <Area type="monotone" dataKey="income" stroke="none" fill="url(#balanceGradient)" />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#A23D5D"
              strokeWidth={3}
              dot={{ r: 5, fill: "#A23D5D", stroke: "#fff", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
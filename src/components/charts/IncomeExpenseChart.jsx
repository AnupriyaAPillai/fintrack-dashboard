import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend,
} from "recharts";
import EmptyState from "../EmptyState";

export default function IncomeExpenseChart({ data }) {
  return (
    <div className="bg-card border border-border p-6 rounded-card transition-colors duration-300 shadow-lg shadow-accent/10">
      <h3 className="text-accent mb-4">Income vs Expenses — last 6 months</h3>

      {!data || data.length === 0 ? (
        <EmptyState
          icon="*"
          message="No comparison data yet"
          sub="Add income and expense transactions to see the comparison."
        />
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--color-text-secondary)"
              strokeOpacity={0.2}
            />
            <XAxis dataKey="month" stroke="#9CA3AF" tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
            <Tooltip formatter={(v) => [`₹${v.toLocaleString("en-IN")}`]} />
            <Legend />
            <Bar dataKey="income"  fill="#A23D5D" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#DE6189" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
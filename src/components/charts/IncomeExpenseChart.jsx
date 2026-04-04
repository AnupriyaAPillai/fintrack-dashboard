import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function IncomeExpenseChart({
  data,
}) {
  return (
    <div
      className="
        bg-card
        border border-border
        p-6
        rounded-card
        transition-colors duration-300
        shadow-lg
        shadow-accent/10
      "
    >
      <h3 className="text-accent mb-4">
        Income vs Expenses - last 6 months 
      </h3>

      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <BarChart data={data}>

          {/* Grid */}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
          />

          {/* X Axis */}

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
          />

          {/* Y Axis */}

          <YAxis
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              `₹${v / 1000}k`
            }
          />

          {/* Tooltip */}

          <Tooltip />

          {/* Legend */}

          <Legend />

          {/* Bars */}

          <Bar
            dataKey="income"
            fill="#A23D5D"
            radius={[4, 4, 0, 0]}
          />

          <Bar
            dataKey="expense"
            fill="#DE6189"
            radius={[4, 4, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}
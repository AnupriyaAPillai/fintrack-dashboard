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

export default function BalanceTrendChart({
  data,
}) {
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
        Balance trend - Monthly 
      </h3>

      <ResponsiveContainer
        width="100%"
        height={280}
      >
        <LineChart data={data}>

          {/* Gradient */}

          <defs>
            <linearGradient
              id="balanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor="#A23D5D"
                stopOpacity={0.35}
              />
              <stop
                offset="95%"
                stopColor="#A23D5D"
                stopOpacity={0}
              />
            </linearGradient>
          </defs>

          {/* Grid */}

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.08)"
          />

          {/* Axes */}

          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#9CA3AF"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) =>
              `₹${v / 1000}k`
            }
          />

          <Tooltip />

          {/* Area */}

          <Area
            type="monotone"
            dataKey="income"
            stroke="none"
            fill="url(#balanceGradient)"
          />

          {/* Line */}

          <Line
            type="monotone"
            dataKey="income"
            stroke="#A23D5D"
            strokeWidth={3}
            dot={{
              r: 5,
              fill: "#A23D5D",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            activeDot={{ r: 7 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}
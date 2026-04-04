import { useDashboard } from "../../context/DashboardContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function SpendingBreakdown() {
  const { transactions } = useDashboard();

  /*
  Calculate category totals
  */

  const categoryTotals = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) +
        Number(t.amount);
    });

  const total = Object.values(
    categoryTotals
  ).reduce((a, b) => a + b, 0);

  const data = Object.entries(
    categoryTotals
  ).map(([name, value]) => ({
    name,
    value,
    percent: Math.round(
      (value / total) * 100
    ),
  }));

  /*
  Your theme colors
  */

  const COLORS = [
  "#A23D5D",
  "#DE6189",
  "#F7A4BE",
  "#F33370",
  "#DC87A2",
  "#6D0425",
];

  /*
  Custom tooltip
  */

  const CustomTooltip = ({
    active,
    payload,
  }) => {
    if (
      active &&
      payload &&
      payload.length
    ) {
      const item = payload[0].payload;

      return (
        <div
          className="
            bg-card
            border
            border-border
            px-3 py-2
            rounded
            text-sm
          "
        >
          <div className="font-medium">
            {item.name}
          </div>

          <div>
            ₹
            {item.value.toLocaleString(
              "en-IN"
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      className="
        bg-card
        border
        border-border
        p-6
        rounded-card
        shadow-lg
        shadow-accent/10
      "
    >
      <h3 className="text-accent mb-4">
        Spending Breakdown - By category 
      </h3>

      <div className="flex items-center justify-center gap-12 flex-wrap">

        {/* Donut Chart */}

        <div className="w-[280px] h-[280px]">

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={80}
                outerRadius={110}
                paddingAngle={2}
              >
                {data.map(
                  (entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                content={
                  <CustomTooltip />
                }
              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Legend */}

        <div className="flex flex-col gap-3">

          {data.map(
            (item, index) => (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  justify-between
                  w-[220px]
                "
              >
                <div className="flex items-center gap-2">

                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      background:
                        COLORS[index],
                    }}
                  />

                  <span className="text-textPrimary">
                    {item.name}
                  </span>

                </div>

                <span className="text-textSecondary">
                  {item.percent}%
                </span>

              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
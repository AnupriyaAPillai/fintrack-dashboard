import { useDashboard } from "../context/DashboardContext";

import KPIGrid from "../components/KPIGrid";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CategoryBarChart from "../components/charts/CategoryBarChart";

export default function Insights() {
  return (
    <div className="space-y-6">

      <KPIGrid />

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
          Monthly comparison - income vs expenses
        </h3>

        <MonthlyBarChart />

      </div>

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
          Spending by category - last 6 months
        </h3>

        <CategoryBarChart />

      </div>

    </div>
  );
}
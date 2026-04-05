import KPIGrid from "../components/KPIGrid";
import MonthlySavingsChart from "../components/charts/MonthlySavingsChart";
import CategoryBarChart from "../components/charts/CategoryBarChart";

export default function Insights() {
  return (
    <div className="space-y-6">

      <KPIGrid />

      <div className="bg-card border border-border p-6 rounded-card shadow-lg shadow-accent/10">
        <h3 className="text-accent mb-4">
          Monthly net savings
        </h3>
        <MonthlySavingsChart />
      </div>

      <div className="bg-card border border-border p-6 rounded-card shadow-lg shadow-accent/10">
        <h3 className="text-accent mb-4">
          Spending by category
        </h3>
        <CategoryBarChart />
      </div>

    </div>
  );
}
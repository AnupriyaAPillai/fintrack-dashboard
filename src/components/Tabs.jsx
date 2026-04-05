import { useDashboard } from "../context/DashboardContext";

export default function Tabs() {
  const { tab, setTab } = useDashboard();

  const tabs = [
    { name: "overview",      label: "Overview" },
    { name: "transactions",  label: "Transactions" },
    { name: "insights",      label: "Insights" },
  ];

  return (
    <div className="mb-6 px-0">
      <div
        className="
          flex
          w-full
          bg-card
          border border-border
          p-1
          rounded-full
        "
      >
        {tabs.map(({ name, label }) => (
          <button
            key={name}
            onClick={() => setTab(name)}
            className={`
              flex-1
              text-center
              px-2 py-2
              rounded-full
              text-sm font-medium
              transition-all duration-300
              whitespace-nowrap
              ${
                tab === name
                  ? "bg-accent text-white shadow-sm"
                  : "text-textSecondary hover:bg-bg"
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
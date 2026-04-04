import { useDashboard } from "../context/DashboardContext";

export default function Tabs() {
  const { tab, setTab } = useDashboard();

  const tabStyle = (name) =>
    `
    group
    flex items-center gap-3
    px-6 py-1
    rounded-full
    font-medium
    transition-all duration-300

    ${
      tab === name
        ? "bg-accent text-white shadow-sm"
        : "text-textSecondary hover:bg-bg"
    }
  `;

  return (
    <div className="flex justify-center mb-6">

      <div
        className="
          flex gap-2
          bg-card
          border border-border
          p-1
          rounded-full
        "
      >

        {/* Overview */}

        <button
          className={tabStyle("overview")}
          onClick={() =>
            setTab("overview")
          }
        >
        

          Overview
        </button>

        {/* Transactions */}

        <button
          className={tabStyle("transactions")}
          onClick={() =>
            setTab("transactions")
          }
        >
       

          Transactions
        </button>

        {/* Insights */}

        <button
          className={tabStyle("insights")}
          onClick={() =>
            setTab("insights")
          }
        >


          Insights
        </button>

      </div>

    </div>
  );
}
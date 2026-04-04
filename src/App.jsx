import { useDashboard } from "./context/DashboardContext";

import Navbar from "./components/Navbar";
import Tabs from "./components/Tabs";

import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import { useEffect } from "react";

export default function App() {
  const { tab } = useDashboard();

  const renderPage = () => {
    if (tab === "transactions")
      return <Transactions />;

    if (tab === "insights")
      return <Insights />;

    return <Overview />;
  };

 useEffect(() => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, []); 

  return (
    <div className="
  min-h-screen
  bg-bg
  text-textPrimary
  transition-colors duration-300
">

      <Navbar />

      <div className="max-w-6xl mx-auto p-6">

        <Tabs />

        {renderPage()}

      </div>

    </div>
  );
}
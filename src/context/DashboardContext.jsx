import { createContext, useContext, useState } from "react";
import { transactionsData } from "../data/transactions";

const DashboardContext = createContext();

const STORAGE_KEY = "fintrack_transactions";
const SEED_VERSION_KEY = "fintrack_seed_version";
const CURRENT_SEED_VERSION = "v2"; // bump this whenever you replace transactions.js

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(true);
  const [tab, setTab] = useState("overview");

  const [transactions, setTransactionsState] = useState(() => {
    try {
      const savedVersion = localStorage.getItem(SEED_VERSION_KEY);

      // If seed version changed (or never set), wipe old data and load fresh seed
      if (savedVersion !== CURRENT_SEED_VERSION) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(SEED_VERSION_KEY, CURRENT_SEED_VERSION);
        return transactionsData;
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : transactionsData;
    } catch {
      return transactionsData;
    }
  });

  const setTransactions = (data) => {
    setTransactionsState(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // quota exceeded — silently ignore
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        darkMode,
        setDarkMode,
        tab,
        setTab,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
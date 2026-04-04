import { useDashboard } from "../context/DashboardContext";
import { useEffect } from "react";

export default function Navbar() {
  const {
    role,
    setRole,
    darkMode,
    setDarkMode,
  } = useDashboard();

  // Apply saved theme on first load
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      className="
        flex justify-between items-center
        px-8 py-4
        bg-bg
        text-textPrimary
        border-b border-border
        transition-colors duration-300
      "
    >
      {/* Left side */}

      <div>
        <h1 className="text-2xl font-bold text-accent">
          FinTrack
        </h1>

        <p className="text-sm text-textSecondary">
          Keep track of your money
        </p>
      </div>

      {/* Right side controls */}

      <div className="flex items-center gap-4">

        {/* Role Toggle */}

        <button
          onClick={() =>
            setRole(
              role === "admin"
                ? "viewer"
                : "admin"
            )
          }
          className="
            px-6 py-2
            bg-accent
            text-white
            font-semibold
            rounded-full
            shadow-sm
            hover:opacity-90
            transition
          "
        >
          {role === "admin"
            ? "Admin"
            : "Viewer"}
        </button>

        {/* Theme Toggle Capsule */}

        {/* Theme Toggle */}

        <div
        onClick={toggleTheme}
        className="
            relative
            w-20 h-10
            rounded-full
            bg-card
            p-1
            cursor-pointer
            transition-colors duration-300
        "
        >
        <div
            className={`
            absolute
            top-1
            w-8 h-8
            flex items-center justify-center
            rounded-full
            bg-accent
            text-white
            shadow-sm
            transition-all duration-300
            ${darkMode ? "left-1" : "left-10"}
            `}
        >
            {darkMode ? "🌙" : "☀️"}
        </div>
        </div>

      </div>
    </div>
  );
}
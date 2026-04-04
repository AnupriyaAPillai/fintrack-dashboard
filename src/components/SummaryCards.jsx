import { useDashboard } from "../context/DashboardContext";

export default function SummaryCards() {
  const { transactions } = useDashboard();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);

  const balance = income - expense;

  const cards = [
    {
      label: "Total Balance",
      value: balance,
      isCurrency: true,
      color: balance >= 0 ? "text-emerald-500" : "text-rose-500",
    },
    {
      label: "Total Income",
      value: income,
      isCurrency: true,
      color: "text-emerald-500",
    },
    {
      label: "Total Expenses",
      value: expense,
      isCurrency: true,
      color: "text-rose-400",
    },
    {
      label: "Transactions",
      value: transactions.length,
      isCurrency: false,
      color: "text-accent",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="
            bg-card border border-border
            p-5 rounded-card
            shadow-lg shadow-accent/10
          "
        >
          <p className="text-xs text-textSecondary uppercase tracking-wide">
            {card.label}
          </p>
          <h2 className={`text-2xl font-bold mt-2 ${card.color}`}>
            {card.isCurrency
              ? `₹${card.value.toLocaleString("en-IN")}`
              : card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}
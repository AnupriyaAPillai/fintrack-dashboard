import { useDashboard } from "../context/DashboardContext";
import { useState, useEffect } from "react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Health",
  "Shopping",
  "Utilities",
  "Education",
  "Income",
  "Other",
];

export default function TransactionModal({ editTx, setShowModal }) {
  const { transactions, setTransactions } = useDashboard();

  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: "",
    type: "expense",
    category: "Food",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editTx) setForm(editTx);
  }, [editTx]);

  const validate = () => {
    const e = {};
    if (!form.description.trim()) e.description = "Required";
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!form.date) e.date = "Required";
    return e;
  };

  const save = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const entry = { ...form, amount: Number(form.amount) };

    if (editTx) {
      setTransactions(
        transactions.map((t) => (t.id === editTx.id ? entry : t))
      );
    } else {
      setTransactions([...transactions, { ...entry, id: Date.now() }]);
    }

    setShowModal(false);
  };

  const field =
    "w-full mb-1 p-2 bg-bg border border-border rounded text-textPrimary focus:outline-none focus:border-accent";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-card p-6 rounded-card w-full max-w-md shadow-xl">
        <h2 className="text-accent text-lg font-semibold mb-4">
          {editTx ? "Edit Transaction" : "Add Transaction"}
        </h2>

        {/* Description */}
        <label className="text-xs text-textSecondary mb-1 block">Description</label>
        <input
          placeholder="e.g. Grocery run"
          className={field}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        {errors.description && (
          <p className="text-rose-400 text-xs mb-2">{errors.description}</p>
        )}

        {/* Amount */}
        <label className="text-xs text-textSecondary mt-2 mb-1 block">Amount (₹)</label>
        <input
          type="number"
          placeholder="0"
          className={field}
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        {errors.amount && (
          <p className="text-rose-400 text-xs mb-2">{errors.amount}</p>
        )}

        {/* Date */}
        <label className="text-xs text-textSecondary mt-2 mb-1 block">Date</label>
        <input
          type="date"
          className={field}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        {errors.date && (
          <p className="text-rose-400 text-xs mb-2">{errors.date}</p>
        )}

        {/* Type */}
        <label className="text-xs text-textSecondary mt-2 mb-1 block">Type</label>
        <select
          className={field}
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {/* Category */}
        <label className="text-xs text-textSecondary mt-2 mb-1 block">Category</label>
        <select
          className={`${field} mb-4`}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border border-border rounded text-textSecondary hover:bg-bg transition"
          >
            Cancel
          </button>
          <button
            onClick={save}
            className="px-4 py-2 bg-accent text-white rounded hover:opacity-90 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
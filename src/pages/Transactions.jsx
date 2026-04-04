import { useDashboard } from "../context/DashboardContext";
import { useState, useMemo } from "react";
import TransactionModal from "../components/TransactionModal";
import Pagination from "../components/Pagination";

const PER_PAGE = 12;

export default function Transactions() {
  const { transactions, setTransactions, role } = useDashboard();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState(null);

  const categories = [...new Set(transactions.map((t) => t.category))];

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <span className="text-textSecondary opacity-40 ml-1">↕</span>;
    return <span className="text-accent ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  const filtered = useMemo(() => {
    let list = transactions.filter((t) => {
      if (search && !t.description.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (typeFilter && t.type !== typeFilter) return false;
      if (categoryFilter && t.category !== categoryFilter) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortBy === "amount") {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });

    return list;
  }, [transactions, search, typeFilter, categoryFilter, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const deleteTx = (id) => {
    if (window.confirm("Delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const exportCSV = () => {
    const header = "Date,Description,Category,Type,Amount\n";
    const rows = filtered
      .map((t) => `${t.date},${t.description},${t.category},${t.type},${t.amount}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className="bg-card border border-border p-4 md:p-6 rounded-card shadow-lg shadow-accent/10">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-accent font-semibold text-lg">Transactions</h2>
        <div className="flex gap-2 flex-wrap">
          {role === "admin" && (
            <button
              onClick={() => { setEditTx(null); setShowModal(true); }}
              className="px-4 py-2 bg-accent text-white rounded-full text-sm hover:opacity-90 transition"
            >
              + Add
            </button>
          )}
          <button
            onClick={exportCSV}
            className="px-4 py-2 border border-accent text-accent rounded-full text-sm hover:bg-accent hover:text-white transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          placeholder="Search..."
          className="px-3 py-2 bg-bg border border-border rounded text-sm text-textPrimary w-full sm:w-auto flex-1 min-w-[140px] focus:outline-none focus:border-accent"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select
          className="px-3 py-2 bg-bg border border-border rounded text-sm text-textPrimary focus:outline-none focus:border-accent"
          value={typeFilter}
          onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="px-3 py-2 bg-bg border border-border rounded text-sm text-textPrimary focus:outline-none focus:border-accent"
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-textSecondary">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-medium">No transactions found</p>
          <p className="text-sm mt-1">Try adjusting your filters{role === "admin" ? " or add a new transaction" : ""}.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-textSecondary border-b border-border">
                  <th className="py-3 px-4 cursor-pointer hover:text-accent" onClick={() => toggleSort("date")}>
                    Date <SortIcon col="date" />
                  </th>
                  <th className="py-3 px-4 cursor-pointer hover:text-accent" onClick={() => toggleSort("description")}>
                    Description <SortIcon col="description" />
                  </th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4 text-right cursor-pointer hover:text-accent" onClick={() => toggleSort("amount")}>
                    Amount <SortIcon col="amount" />
                  </th>
                  {role === "admin" && <th className="py-3 px-4">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((t) => (
                  <tr key={t.id} className="border-b border-border hover:bg-bg transition">
                    <td className="py-3 px-4 text-textSecondary">{t.date}</td>
                    <td className="py-3 px-4">{t.description}</td>
                    <td className="py-3 px-4">
                        {t.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        t.type === "income"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-rose-400/10 text-rose-400"
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${
                      t.type === "income" ? "text-emerald-500" : "text-rose-400"
                    }`}>
                      {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                    </td>
                    {role === "admin" && (
                      <td className="py-3 px-4">
                        <div className="flex gap-3">
                          <button
                            className="text-accent hover:underline text-xs"
                            onClick={() => { setEditTx(t); setShowModal(true); }}
                          >
                            Edit
                          </button>
                          <button
                            className="text-rose-400 hover:underline text-xs"
                            onClick={() => deleteTx(t.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {paginated.map((t) => (
              <div key={t.id} className="bg-bg border border-border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-textPrimary">{t.description}</p>
                    <p className="text-xs text-textSecondary mt-1">{t.date} · {t.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${t.type === "income" ? "text-emerald-500" : "text-rose-400"}`}>
                      {t.type === "income" ? "+" : "-"}₹{Number(t.amount).toLocaleString("en-IN")}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                      t.type === "income"
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-rose-400/10 text-rose-400"
                    }`}>
                      {t.type}
                    </span>
                  </div>
                </div>
                {role === "admin" && (
                  <div className="flex gap-4 mt-3 pt-3 border-t border-border">
                    <button
                      className="text-accent text-sm"
                      onClick={() => { setEditTx(t); setShowModal(true); }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-rose-400 text-sm"
                      onClick={() => deleteTx(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-textSecondary">
            <span>{filtered.length} transaction{filtered.length !== 1 ? "s" : ""}</span>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
          </div>
        </>
      )}

      {showModal && (
        <TransactionModal editTx={editTx} setShowModal={setShowModal} />
      )}
    </div>
  );
}
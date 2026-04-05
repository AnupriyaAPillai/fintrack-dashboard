# FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with React, Tailwind CSS, and Recharts.

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone / unzip the project, then:
npm install
npm run dev
```

Open https://fintrack-dashboard-teal.vercel.app/ in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── BalanceTrendChart.jsx   # Line chart – balance over time
│   │   ├── CategoryBarChart.jsx    # Horizontal bar – spend by category
│   │   ├── IncomeExpenseChart.jsx  # Grouped bar – income vs expenses
│   │   ├── MonthlySavingsChart.jsx     # Monthly comparison savings chart
│   │   └── SpendingBreakdown.jsx   # Donut chart – category percentages
│   ├── KPIGrid.jsx                 # Insight cards (top category, savings rate, avg expense)
│   ├── Navbar.jsx                  # App header with role toggle and theme switch
│   ├── Pagination.jsx              # Reusable pagination control
│   ├── SummaryCards.jsx            # Top-level balance / income / expense / count cards
│   ├── Tabs.jsx                    # Overview / Transactions / Insights navigation
│   └── TransactionModal.jsx        # Add / Edit transaction form with validation
├── context/
│   └── DashboardContext.jsx        # Global state via React Context
├── data/
│   └── transactions.js             # Transaction data
├── pages/
│   ├── Overview.jsx                # Dashboard home: summary + charts
│   ├── Transactions.jsx            # Full transaction list with filter, sort, search
│   └── Insights.jsx                # KPIs + monthly savings comparison + category breakdown
├── App.jsx
├── main.jsx
└── index.css                       # Tailwind + CSS custom properties (light/dark themes)
```

---

## Features

### Dashboard Overview
- **Summary cards**: Total Balance, Income, Expenses, and Transaction count — all derived live from the transactions dataset.
- **Balance Trend chart**: Line chart showing income trend over the last 6 months.
- **Spending Breakdown**: Donut chart with legend — spending split by category.
- **Income vs Expenses**: Grouped bar chart comparing the two month-by-month.

### Transactions
- Full sortable table (click column headers for Date, Description, Amount).
- Filter by **type** (income/expense) and **category**.
- **Search** by description keyword.
- Paginated (12 per page).
- **Mobile-friendly card layout** on small screens.
- Empty state message when no results match filters.

### Role-Based UI
Simulated on the frontend using a toggle in the navbar.

| Feature | Admin | Viewer |
|---      |---    |---     |
| View all data | ✅ | ✅ |
| Add transaction | ✅ | ❌ |
| Edit transaction | ✅ | ❌ |
| Delete transaction | ✅ | ❌ |

### Insights
- Highest spending category
- Savings rate with contextual feedback (healthy / below threshold)
- Average expense per transaction
- Monthly income vs expense bar chart
- Per-category spending bar chart (horizontal)

### State Management
React Context (`DashboardContext`) manages:
- `transactions` — with localStorage persistence (changes survive page refresh)
- `role` — admin / viewer
- `darkMode` — persisted to localStorage
- `tab` — active page

### Additional Features
- **Dark / Light mode** toggle (persisted)
- **CSV export** of the currently filtered transaction list
- **Form validation** in the Add/Edit modal
- **Data persistence** via localStorage
- Responsive layout (mobile + desktop)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Styling | Tailwind CSS + CSS custom properties |
| Charts | Recharts |
| State | React Context + useState |
| Build | Vite |
| Persistence | localStorage |

---

## Assumptions

- All monetary values are in Indian Rupees (₹).
- Transactions are seeded from `transactions.js`; once the app is first loaded, they are stored in localStorage and any edits persist across sessions.
- Role switching is frontend-only for demonstration purposes.
- "Viewer" sees all data but has no write access.

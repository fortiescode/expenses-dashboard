# Expense Tracker

A personal finance dashboard to track expenses, categorize spending, and visualize where your money goes.

## Tech Stack
- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Deployment:** Netlify

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Features
- Add, edit, and delete expenses
- Categorize spending (8 categories)
- Dashboard with summary stats
- Pie chart: spending by category
- Bar chart: daily spending (last 7 days)
- Filter expenses by category and date range
- Responsive design

## Project Structure
```
src/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── layout.tsx            # Root layout with sidebar
│   └── expenses/
│       ├── page.tsx          # Expense list with filters
│       ├── new/page.tsx      # Add expense form
│       └── [id]/edit/page.tsx # Edit expense form
├── components/
│   ├── charts/
│   │   ├── CategoryPieChart.tsx
│   │   └── DailyBarChart.tsx
│   ├── layout/
│   │   └── Sidebar.tsx
│   └── ui/
│       └── StatCard.tsx
└── lib/
    ├── types.ts              # TypeScript types
    ├── data.ts               # Data layer (localStorage)
    └── utils.ts              # Helper functions
```

## License
MIT

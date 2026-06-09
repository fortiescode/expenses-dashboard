# DESIGN SYSTEM — Expense Tracker
**Author:** Designer
**Version:** 1.0

## Color Palette

### Primary
- `--primary-50`: #eff6ff
- `--primary-100`: #dbeafe
- `--primary-500`: #3b82f6
- `--primary-600`: #2563eb
- `--primary-700`: #1d4ed8

### Semantic
- `--success`: #22c55e
- `--warning`: #f59e0b
- `--danger`: #ef4444
- `--info`: #06b6d4

### Neutrals
- `--gray-50`: #f9fafb
- `--gray-100`: #f3f4f6
- `--gray-200`: #e5e7eb
- `--gray-400`: #9ca3af
- `--gray-600`: #4b5563
- `--gray-800`: #1f2937
- `--gray-900`: #111827

### Category Colors
| Category | Color |
|----------|-------|
| Food & Dining | #f97316 |
| Transportation | #3b82f6 |
| Shopping | #a855f7 |
| Entertainment | #ec4899 |
| Bills & Utilities | #eab308 |
| Health & Fitness | #22c55e |
| Travel | #06b6d4 |
| Other | #6b7280 |

## Typography
- **Font Family:** Inter (via next/font)
- **Headings:** font-semibold
- **Body:** font-normal, text-sm/base

| Element | Size | Weight |
|---------|------|--------|
| H1 | 2xl (24px) | bold |
| H2 | xl (20px) | semibold |
| H3 | lg (18px) | semibold |
| Body | base (16px) | normal |
| Small | sm (14px) | normal |
| XS | xs (12px) | normal |

## Spacing Scale
4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64

## Border Radius
- Cards: rounded-xl (12px)
- Buttons: rounded-lg (8px)
- Inputs: rounded-lg (8px)
- Badges: rounded-full

## Shadows
- Card: shadow-sm
- Card hover: shadow-md
- Modal: shadow-xl
- Dropdown: shadow-lg

## Component Patterns

### Cards
- White background
- rounded-xl
- shadow-sm
- p-6
- hover:shadow-md transition

### Buttons
- Primary: bg-primary-600 text-white hover:bg-primary-700
- Secondary: bg-gray-100 text-gray-700 hover:bg-gray-200
- Danger: bg-red-50 text-red-600 hover:bg-red-100
- All: px-4 py-2 rounded-lg font-medium transition-colors

### Inputs
- border border-gray-200 rounded-lg px-3 py-2
- focus:ring-2 focus:ring-primary-500 focus:border-primary-500
- text-sm

### Stat Cards
- Icon on left (48px circle, light bg)
- Label: text-sm text-gray-500
- Value: text-2xl font-bold
- Trend: text-sm (green for down/good, red for up/bad for expenses)

## Layout
- Max-width: 1280px
- Sidebar: 240px (collapsible on mobile)
- Main content: fluid
- Grid: 1 col mobile, 2 col tablet, 3-4 col desktop

## Charts
- Pie chart: spending by category
- Bar chart: daily spending (last 7/30 days)
- Line chart: spending trend over time
- All charts use category color palette

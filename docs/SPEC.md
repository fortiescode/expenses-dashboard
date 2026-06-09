# PROJECT SPEC — Expense Tracker Dashboard
**Version:** 1.0
**Author:** PM
**Date:** 2026-06-08

## Overview
A personal finance dashboard that lets users track expenses, categorize spending, and visualize where their money goes.

## User Stories

### MVP (Phase 1)
1. As a user, I can **add an expense** with amount, category, date, and note
2. As a user, I can **view all expenses** in a list sorted by date
3. As a user, I can **see a summary** of total spending (today, this week, this month)
4. As a user, I can **filter expenses** by category and date range
5. As a user, I can **see a pie chart** of spending by category
6. As a user, I can **see a bar chart** of daily/weekly spending trends
7. As a user, I can **edit or delete** an expense

### Phase 2 (Nice to have)
- User accounts (NextAuth)
- Budget limits per category
- Export to CSV
- Recurring expenses
- Dark mode toggle

## Data Model

### Expense
| Field | Type | Required |
|-------|------|----------|
| id | UUID | Yes |
| amount | Decimal | Yes |
| category | String | Yes |
| date | Date | Yes |
| note | String | No |
| created_at | DateTime | Yes |
| updated_at | DateTime | Yes |

### Categories (Default)
- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Health & Fitness
- Travel
- Other

## Pages / Routes
| Route | Description |
|-------|-------------|
| `/` | Dashboard (summary + charts + recent expenses) |
| `/expenses` | Full expense list with filters |
| `/expenses/new` | Add new expense form |
| `/expenses/[id]/edit` | Edit expense form |
| `/settings` | Settings (categories, budget) — Phase 2 |

## Technical Requirements
- Server Components by default, Client Components for interactivity
- API routes for CRUD operations
- Responsive design (mobile-first)
- Accessible (WCAG 2.1 AA)
- Fast (Lighthouse 90+)

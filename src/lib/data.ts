import { Expense, Category, CATEGORIES } from "./types";

const STORAGE_KEY = "expense-tracker-data";

export function getExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data) as Expense[];
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function addExpense(
  expense: Omit<Expense, "id" | "created_at" | "updated_at">
): Expense {
  const expenses = getExpenses();
  const now = new Date().toISOString();
  const newExpense: Expense = {
    ...expense,
    id: crypto.randomUUID(),
    created_at: now,
    updated_at: now,
  };
  expenses.unshift(newExpense);
  saveExpenses(expenses);
  return newExpense;
}

export function updateExpense(
  id: string,
  updates: Partial<Omit<Expense, "id" | "created_at">>
): Expense | null {
  const expenses = getExpenses();
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return null;
  expenses[index] = {
    ...expenses[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  saveExpenses(expenses);
  return expenses[index];
}

export function deleteExpense(id: string): boolean {
  const expenses = getExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  if (filtered.length === expenses.length) return false;
  saveExpenses(filtered);
  return true;
}

export function getExpensesByCategory(
  expenses: Expense[]
): { category: Category; total: number }[] {
  const totals: Record<string, number> = {};
  for (const cat of CATEGORIES) {
    totals[cat] = 0;
  }
  for (const exp of expenses) {
    totals[exp.category] = (totals[exp.category] || 0) + exp.amount;
  }
  return CATEGORIES.map((category) => ({
    category,
    total: totals[category] || 0,
  })).filter((c) => c.total > 0);
}

export function getExpensesByDateRange(
  expenses: Expense[],
  startDate: string,
  endDate: string
): Expense[] {
  return expenses.filter((e) => {
    const d = e.date;
    return d >= startDate && d <= endDate;
  });
}

export function getTotalSpending(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

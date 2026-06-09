export const CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Health & Fitness",
  "Travel",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_COLORS: Record<Category, string> = {
  "Food & Dining": "#f97316",
  Transportation: "#3b82f6",
  Shopping: "#a855f7",
  Entertainment: "#ec4899",
  "Bills & Utilities": "#eab308",
  "Health & Fitness": "#22c55e",
  Travel: "#06b6d4",
  Other: "#6b7280",
};

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  date: string; // ISO date string
  note: string;
  created_at: string;
  updated_at: string;
}

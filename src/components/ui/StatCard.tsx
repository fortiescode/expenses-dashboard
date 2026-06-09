"use client";

import { Category, CATEGORY_COLORS } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-700">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p
              className={`text-sm ${trend.positive ? "text-green-600" : "text-red-500"}`}
            >
              {trend.value}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface CategoryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export function CategoryBadge({ category, size = "md" }: CategoryBadgeProps) {
  const color = CATEGORY_COLORS[category] || "#6b7280";
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm";

  // Light backgrounds need dark text for contrast
  const lightColors = ["#eab308", "#f97316", "#22c55e", "#06b6d4"];
  const useDarkText = lightColors.includes(color.toLowerCase());

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses}`}
      style={{
        backgroundColor: color,
        color: useDarkText ? "#1f2937" : "#ffffff",
      }}
    >
      {category}
    </span>
  );
}

interface ExpenseRowProps {
  expense: {
    id: string;
    amount: number;
    category: Category;
    date: string;
    note: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpenseRow({ expense, onEdit, onDelete }: ExpenseRowProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-3 px-4">
        <span className="font-semibold text-gray-900">
          {formatCurrency(expense.amount)}
        </span>
      </td>
      <td className="py-3 px-4">
        <CategoryBadge category={expense.category} size="sm" />
      </td>
      <td className="py-3 px-4 text-gray-600 text-sm">
        {new Date(expense.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="py-3 px-4 text-gray-500 text-sm max-w-[200px] truncate">
        {expense.note || "—"}
      </td>
      <td className="py-3 px-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense.id)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

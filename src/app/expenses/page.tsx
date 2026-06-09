"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Expense, Category, CATEGORIES } from "@/lib/types";
import { getExpenses, deleteExpense, getExpensesByCategory, getTotalSpending } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ExpensesPage() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterFrom, setFilterFrom] = useState<string>("");
  const [filterTo, setFilterTo] = useState<string>("");

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filterCategory !== "all" && e.category !== filterCategory) return false;
      if (filterFrom && e.date < filterFrom) return false;
      if (filterTo && e.date > filterTo) return false;
      return true;
    });
  }, [expenses, filterCategory, filterFrom, filterTo]);

  const total = getTotalSpending(filtered);

  const handleDelete = (id: string) => {
    if (confirm("Delete this expense?")) {
      deleteExpense(id);
      setExpenses(getExpenses());
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-600 mt-1">
              {filtered.length} expense{filtered.length !== 1 ? "s" : ""} • Total:{" "}
              <span className="font-semibold text-gray-900">
                {formatCurrency(total)}
              </span>
            </p>
          </div>
          <Link
            href="/expenses/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            + Add Expense
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                From
              </label>
              <input
                type="date"
                value={filterFrom}
                onChange={(e) => setFilterFrom(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                To
              </label>
              <input
                type="date"
                value={filterTo}
                onChange={(e) => setFilterTo(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {(filterCategory !== "all" || filterFrom || filterTo) && (
              <button
                onClick={() => {
                  setFilterCategory("all");
                  setFilterFrom("");
                  setFilterTo("");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium pb-2"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Expense List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-600">
              <p className="text-lg mb-2">No expenses found</p>
              <Link
                href="/expenses/new"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Add your first expense →
              </Link>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b border-gray-100 bg-gray-50">
                  <th className="py-3 px-4 font-medium">Amount</th>
                  <th className="py-3 px-4 font-medium">Category</th>
                  <th className="py-3 px-4 font-medium">Date</th>
                  <th className="py-3 px-4 font-medium">Note</th>
                  <th className="py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor:
                            {
                              "Food & Dining": "#f97316",
                              Transportation: "#3b82f6",
                              Shopping: "#a855f7",
                              Entertainment: "#ec4899",
                              "Bills & Utilities": "#eab308",
                              "Health & Fitness": "#22c55e",
                              Travel: "#06b6d4",
                              Other: "#6b7280",
                            }[expense.category] || "#6b7280",
                          color: ["#eab308", "#f97316", "#22c55e", "#06b6d4"].includes(
                            {
                              "Food & Dining": "#f97316",
                              Transportation: "#3b82f6",
                              Shopping: "#a855f7",
                              Entertainment: "#ec4899",
                              "Bills & Utilities": "#eab308",
                              "Health & Fitness": "#22c55e",
                              Travel: "#06b6d4",
                              Other: "#6b7280",
                            }[expense.category] || "#6b7280"
                          ) ? "#1f2937" : "#ffffff",
                        }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {formatDate(expense.date)}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm max-w-[200px] truncate">
                      {expense.note || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/expenses/${expense.id}/edit`}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Expense, Category, CATEGORIES } from "@/lib/types";
import {
  getExpenses,
  addExpense,
  deleteExpense,
  getExpensesByCategory,
  getTotalSpending,
} from "@/lib/data";
import {
  formatCurrency,
  getToday,
  getStartOfWeek,
  getStartOfMonth,
} from "@/lib/utils";
import { StatCard } from "@/components/ui/StatCard";
import { CategoryPieChart } from "@/components/charts/CategoryPieChart";
import { DailyBarChart } from "@/components/charts/DailyBarChart";

export default function DashboardPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const today = getToday();
  const weekStart = getStartOfWeek();
  const monthStart = getStartOfMonth();

  const todayExpenses = useMemo(
    () => expenses.filter((e) => e.date === today),
    [expenses, today]
  );
  const weekExpenses = useMemo(
    () => expenses.filter((e) => e.date >= weekStart),
    [expenses, weekStart]
  );
  const monthExpenses = useMemo(
    () => expenses.filter((e) => e.date >= monthStart),
    [expenses, monthStart]
  );

  const todayTotal = getTotalSpending(todayExpenses);
  const weekTotal = getTotalSpending(weekExpenses);
  const monthTotal = getTotalSpending(monthExpenses);

  const categoryData = useMemo(
    () => getExpensesByCategory(monthExpenses),
    [monthExpenses]
  );

  const dailyData = useMemo(() => {
    const last7Days: { date: string; total: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayExpenses = expenses.filter((e) => e.date === dateStr);
      last7Days.push({
        date: dateStr,
        total: getTotalSpending(dayExpenses),
      });
    }
    return last7Days;
  }, [expenses]);

  const recentExpenses = expenses.slice(0, 5);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      deleteExpense(id);
      setExpenses(getExpenses());
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Here&apos;s your spending overview
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            label="Today"
            value={formatCurrency(todayTotal)}
            icon={<span className="text-xl">📅</span>}
          />
          <StatCard
            label="This Week"
            value={formatCurrency(weekTotal)}
            icon={<span className="text-xl">📆</span>}
          />
          <StatCard
            label="This Month"
            value={formatCurrency(monthTotal)}
            icon={<span className="text-xl">🗓️</span>}
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategoryPieChart data={categoryData} />
          <DailyBarChart data={dailyData} />
        </div>

        {/* Recent Expenses */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Expenses
            </h3>
            <Link
              href="/expenses"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              View all →
            </Link>
          </div>
          {recentExpenses.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-2">No expenses yet</p>
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
                <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                  <th className="pb-3 px-4 font-medium">Amount</th>
                  <th className="pb-3 px-4 font-medium">Category</th>
                  <th className="pb-3 px-4 font-medium">Date</th>
                  <th className="pb-3 px-4 font-medium">Note</th>
                  <th className="pb-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
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
                        }}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm max-w-[150px] truncate">
                      {expense.note || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(expense.id)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
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

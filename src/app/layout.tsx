import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Expense Tracker — Track Your Spending",
  description:
    "A personal finance dashboard to track expenses, categorize spending, and visualize where your money goes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-gray-50 min-h-screen">
        <div className="flex">
          <Sidebar />
          <main className="flex-1 min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}

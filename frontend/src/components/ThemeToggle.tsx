"use client";

import { useEffect } from "react";

export default function ThemeToggle() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");

    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-2 transition hover:bg-[var(--primary-soft)]"
      aria-label="Toggle dark mode"
    >
      <span className="block dark:hidden">🌙</span>
      <span className="hidden dark:block">☀️</span>
    </button>
  );
}
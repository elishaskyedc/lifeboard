"use client";

import { useState } from "react";

type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DatePicker({
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const selectedDate = new Date(`${value}T00:00:00`);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
  );

  const monthName = currentMonth.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const previousMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1
      )
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1
      )
    );
  };

  const selectDate = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const selectedDay = String(day).padStart(2, "0");

    onChange(`${year}-${month}-${selectedDay}`);
    setOpen(false);
  };

  const formattedValue = selectedDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-semibold transition hover:bg-[var(--primary-soft)]"
      >
        <span>♡ {formattedValue}</span>

        <span className="text-[var(--muted)]">
          {open ? "↑" : "↓"}
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2 w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={previousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--primary-soft)]"
            >
              ←
            </button>

            <p className="font-extrabold capitalize">
              {monthName}
            </p>

            <button
              type="button"
              onClick={nextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[var(--primary-soft)]"
            >
              →
            </button>
          </div>

          <div className="mt-5 grid grid-cols-7 text-center text-xs font-bold text-[var(--muted)]">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1">
            {Array.from({ length: adjustedFirstDay }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;

              const year = currentMonth.getFullYear();
              const month = String(currentMonth.getMonth() + 1).padStart(
                2,
                "0"
              );
              const dayValue = String(day).padStart(2, "0");

              const dateValue = `${year}-${month}-${dayValue}`;

              const isSelected = dateValue === value;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => selectDate(day)}
                  className={`flex h-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isSelected
                      ? "bg-[var(--primary)] text-[var(--foreground)]"
                      : "hover:bg-[var(--primary-soft)]"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
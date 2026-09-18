"use client";

import { useState } from "react";

// TypeScript type = describes what a Habit looks like
type Habit = {
  id: number;
  name: string;
  color: string;
  completedDays: number[];
};

const habitColours = [
  { name: "pink", colour: "#f3a8c7" },
  { name: "blue", colour: "#9fcfe0" },
  { name: "purple", colour: "#bca9dc" },
  { name: "mint", colour: "#a9d2bd" },
  { name: "yellow", colour: "#e8d18d" },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Gym",
      color: "pink",
      completedDays: [1, 2, 4, 6],
    },
    {
      id: 2,
      name: "Drink Water",
      color: "blue",
      completedDays: [1, 3, 4, 5],
    },
    {
      id: 3,
      name: "Study",
      color: "purple",
      completedDays: [2, 3, 5, 6],
    },
  ]);

  const [newHabit, setNewHabit] = useState("");
  const [newHabitColor, setNewHabitColor] = useState("pink");
  const [showColourPicker, setShowColourPicker] = useState(false);

  const daysInMonth = 30;

  const selectedColour =
    habitColours.find((colour) => colour.name === newHabitColor) ??
    habitColours[0];

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      {/* page heading */}
      <div>
        <p className="text-sm font-semibold text-[var(--mint)]">
          ♡ Little things, every day
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Your habits ♡
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Build consistency, one little habit at a time.
        </p>
      </div>

      {/* habit tracker */}
      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-[var(--mint)]">
            ♡ Monthly tracker
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[var(--mint)]" />

          <h2 className="mt-4 text-2xl font-extrabold">
            September 2026
          </h2>
        </div>

        {/* add habit */}
        <div className="mt-6 rounded-2xl bg-[var(--surface-soft)] p-4">
          <p className="text-sm font-semibold text-[var(--muted)]">
            Add a new habit
          </p>

          <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-center">
            {/* habit name */}
            <input
              type="text"
              placeholder="What would you like to do regularly?"
              value={newHabit}
              onChange={(event) => setNewHabit(event.target.value)}
              className="min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
            />

            {/* colour picker */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() =>
                  setShowColourPicker(!showColourPicker)
                }
                className="flex h-11 items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3 transition hover:bg-[var(--primary-soft)]"
                aria-label="Choose habit colour"
              >
                <span
                  className="h-5 w-5 rounded-full"
                  style={{
                    backgroundColor: selectedColour.colour,
                  }}
                />

                <span className="text-sm font-semibold">
                  Colour
                </span>

                <span className="text-xs text-[var(--muted)]">
                  {showColourPicker ? "▲" : "▼"}
                </span>
              </button>

              {showColourPicker && (
                <div className="absolute left-0 top-13 z-10 flex gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-lg">
                  {habitColours.map((colour) => {
                    const isSelected =
                      newHabitColor === colour.name;

                    return (
                      <button
                        key={colour.name}
                        type="button"
                        onClick={() => {
                          setNewHabitColor(colour.name);
                          setShowColourPicker(false);
                        }}
                        aria-label={`Choose ${colour.name}`}
                        className={`flex h-8 w-8 items-center justify-center rounded-full transition hover:scale-110 ${
                          isSelected
                            ? "ring-2 ring-[var(--foreground)] ring-offset-2"
                            : ""
                        }`}
                        style={{
                          backgroundColor: colour.colour,
                        }}
                      >
                        {isSelected && (
                          <span className="text-xs font-extrabold text-white">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* add habit button */}
            <button
              onClick={() => {
                if (newHabit.trim() === "") {
                  return;
                }

                setHabits([
                  ...habits,
                  {
                    id: Date.now(),
                    name: newHabit,
                    color: newHabitColor,
                    completedDays: [],
                  },
                ]);

                setNewHabit("");
                setNewHabitColor("pink");
                setShowColourPicker(false);
              }}
              className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold transition hover:opacity-90"
            >
              Add Habit ♡
            </button>
          </div>
        </div>

        {/* monthly habit tracker */}
        <div className="mt-6 w-full overflow-x-auto">
          <div className="min-w-[700px]">
            {/* day numbers */}
            <div className="grid grid-cols-[140px_repeat(30,minmax(24px,1fr))] gap-1">
              <div></div>

              {Array.from({ length: daysInMonth }, (_, index) => (
                <div
                  key={index + 1}
                  className="text-center text-xs font-semibold text-[var(--muted)]"
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* habits */}
            <div className="mt-3 space-y-3">
              {habits.map((habit) => {
                const habitColour =
                  habitColours.find(
                    (colour) => colour.name === habit.color
                  ) ?? habitColours[0];

                return (
                  <div
                    key={habit.id}
                    className="grid grid-cols-[140px_repeat(30,minmax(24px,1fr))] gap-1"
                  >
                    {/* habit name */}
                    <div className="flex items-center justify-between rounded-2xl bg-[var(--surface-soft)] px-3">
                      <div className="min-w-0 flex-1">
                        <span
                          title={habit.name}
                          className="block truncate font-semibold"
                        >
                          {habit.name}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setHabits(
                            habits.filter(
                              (currentHabit) =>
                                currentHabit.id !== habit.id
                            )
                          );
                        }}
                        className="ml-2 shrink-0 rounded-full border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--muted)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                      >
                        Delete
                      </button>
                    </div>

                    {/* completion days */}
                    {Array.from(
                      { length: daysInMonth },
                      (_, index) => {
                        const day = index + 1;

                        const completed =
                          habit.completedDays.includes(day);

                        return (
                          <button
                            key={day}
                            onClick={() => {
                              setHabits(
                                habits.map((currentHabit) => {
                                  if (
                                    currentHabit.id !== habit.id
                                  ) {
                                    return currentHabit;
                                  }

                                  return {
                                    ...currentHabit,
                                    completedDays: completed
                                      ? currentHabit.completedDays.filter(
                                          (completedDay) =>
                                            completedDay !== day
                                        )
                                      : [
                                          ...currentHabit.completedDays,
                                          day,
                                        ],
                                  };
                                })
                              );
                            }}
                            className="h-7 w-7 shrink-0 rounded-full border border-[var(--border)] transition hover:opacity-80"
                            style={{
                              backgroundColor: completed
                                ? habitColour.colour
                                : "var(--surface)",
                            }}
                          />
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
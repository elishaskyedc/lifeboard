"use client";

import { useState } from "react";

// TypeScript type = describes what a Habit looks like
type Habit = {
  id: number;
  name: string;
  color: string;
  completedDays: number[];
};

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

  const daysInMonth = 30;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Habits</h1>

      <p className="mt-2 text-gray-600">
        Track your habits and build consistency.
      </p>

      <section className="mt-8 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">September 2026</h2>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Enter a habit..."
            value={newHabit}
            onChange={(event) => setNewHabit(event.target.value)}
            className="rounded-lg border px-4 py-2"
          />

          <select
            value={newHabitColor}
            onChange={(event) => setNewHabitColor(event.target.value)}
            className="ml-2 rounded-lg border px-4 py-2"
          >
            <option value="pink">Pink</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>

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
            }}
            className="ml-2 rounded-lg border px-4 py-2"
          >
            Add Habit
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[700px]">

            {/* Day numbers */}
            <div className="grid grid-cols-[160px_repeat(30,minmax(28px,1fr))] gap-1">
              <div></div>

              {Array.from({ length: daysInMonth }, (_, index) => (
                <div
                  key={index + 1}
                  className="text-center text-xs text-gray-500"
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Habits */}
            <div className="mt-2 space-y-2">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="grid grid-cols-[160px_repeat(30,minmax(28px,1fr))] gap-1"
                >
                <div className="flex items-center justify-between font-medium">
                    <span>{habit.name}</span>

                    <button
                        onClick={() => {
                            setHabits(
                                habits.filter(     // .filter() = creates new array containing items that pass the condition
                                    (currentHabit) => currentHabit.id !== habit.id
                                )
                            );
                        }}
                        className="ml-2 rounded border px-2 py-1 text-xs"
                    >
                        Delete
                    </button>
                </div>

                  {Array.from({ length: daysInMonth }, (_, index) => {
                    const day = index + 1;
                    const completed =
                      habit.completedDays.includes(day);

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          setHabits(
                            habits.map((currentHabit) => {
                              if (currentHabit.id !== habit.id) {
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
                        className={`h-7 rounded-md border ${
                          completed
                            ? habit.color === "pink"
                              ? "bg-pink-400"
                              : habit.color === "blue"
                              ? "bg-blue-400"
                              : "bg-purple-400"
                            : "bg-white"
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
"use client";

import { useState } from "react";
import TaskItem from "@/components/TaskItem";

export default function TasksPage() {
  const [task, setTask] = useState(""); // what you're currently typing
  const [tasks, setTasks] = useState< // list of tasks you've added
    { title: string; completed: boolean }[] // title = text | completed = true or false | [] = storing a list of all tasks
  >([]);

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div>
        <p className="text-sm font-semibold text-[var(--primary-dark)]">
          ✦ Stay on top of things
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Your tasks ♡
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Keep track of the little things you need to get done.
        </p>
      </div>
      
      {/* add task */}
      <div className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--primary-dark)]">
          ✦ Add something
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[var(--primary)]" />

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="What do you need to do?"
            value={task}
            onChange={(event) => setTask(event.target.value)}
            className="flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 outline-none transition focus:border-[var(--primary)]"
          />

          <button
            onClick={() => {
              if (!task.trim()) {
                return;
              }

              setTasks([
                ...tasks,
                {
                  title: task,
                  completed: false,
                },
              ]);

              setTask("");
            }}
            className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold transition hover:opacity-90"
          >
            Add Task ♡
          </button>
        </div>
      </div>

      {/* display input */}
      <ul className="mt-6 space-y-2">
        {tasks.map((task, index) => ( /* .map() = goes through every item in an array to find specific task + displays array
                                      key={index} = gives numbered position in list/array */
          <TaskItem
            key={index}
            title={task.title}
            completed={task.completed}
            onToggle={() => {
              setTasks(
                tasks.map((currentTask, currentIndex) =>
                  currentIndex === index
                    ? { ...currentTask, completed: !currentTask.completed }
                    : currentTask
                )
              );
            }}
            onDelete={() => {
              setTasks(
                tasks.filter((_, currentIndex) => currentIndex !== index)
              );
            }}
          />
        ))}
      </ul>
    </main>
  );
}

/*
* useState → storing changing data
* onChange → responding to user input
* onClick → responding to button clicks
* Arrays → storing multiple tasks
* .map() → turning data into UI 
*/
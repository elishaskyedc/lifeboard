"use client";

import { useState } from "react";
import TaskItem from "@/components/TaskItem";

export default function TasksPage() {
  const [task, setTask] = useState(""); // what you're currently typing
  const [tasks, setTasks] = useState< // list of tasks you've added
    { title: string; completed: boolean }[] // title = text | completed = true or false | [] = storing a list of all tasks
  >([]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Tasks</h1>

      <p className="mt-2 text-gray-600">
        Manage your tasks here.
      </p>
      
      {/* user input */}
      <div className="mt-8"> 
        <input
          type="text"
          placeholder="Enter a task..."
          value={task} // value displayed comes from task state
          onChange={(event) => setTask(event.target.value)} // onChange = do something
          className="rounded-lg border px-4 py-2"
        />
            {/* 
            * event = the change that just happened
            * event.target = the input that changed
            * event.target.value = what the user currently typed 
            */}

      <button
        onClick={() => {
          setTasks([
            ...tasks, // ...tasks = take everything already inside tasks | task = adds the newest task
            {
              title: task,
              completed: false,
            },
          ]); 
          setTask(""); // resets input after adding the new task
        }}
        className="ml-2 rounded-lg border px-4 py-2"
      >
          Add Task
        </button>
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
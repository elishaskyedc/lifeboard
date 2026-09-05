"use client";

import { useState } from "react";

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
          <li key={index} className="rounded-lg border p-3">
            <label className="flex items-center gap-2">

              {/* working checkbox */}
              <input
                type="checkbox"
                checked={task.completed ?? false}
                onChange={() => {
                  setTasks(
                    tasks.map((currentTask, currentIndex) => // .map() = creates updated array | currentTask = task we're looking at | currentIndex = position in array
                      currentIndex === index // "is this the task the user clicked?"
                        ? { ...currentTask, completed: !currentTask.completed } // if yes... (! = not)
                        : currentTask // if isn't task we clicked keep unchanged
                    )
                  );
                }}
              />

              <span>{task.title}</span>
            </label>

            <button
              onClick={() => { // _ = first value (task) but not needed, only index matters
                setTasks(tasks.filter((_, currentIndex) => currentIndex !== index)); // setTasks(...) = tells React about new list
              }} // filter() = JS concept that creates new array of everything except task we want to remove
              className="ml-4 rounded-lg border px-3 py-1"
            >
              Delete
            </button>
          </li>
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
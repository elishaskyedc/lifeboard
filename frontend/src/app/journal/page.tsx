"use client";

import { useState } from "react";

export default function JournalPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [entries, setEntries] = useState<
  { title: string; content: string }[]
  >([]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold">Journal</h1>

      <p className="mt-2 text-gray-600">
        Write down your thoughts and experiences.
      </p>

      <section className="mt-8 rounded-xl border p-6">
        <input
          type="text"
          placeholder="Entry title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border px-4 py-2"
        />

        <textarea // input for multiple lines of text
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="mt-4 min-h-40 w-full rounded-lg border px-4 py-2"
        />

        <button
          onClick={() => {
            if (title.trim() === "" || content.trim() === "") {
              return;
            }

            setEntries([
              ...entries,
              {
                title: title,
                content: content,
              },
            ]);

            setTitle("");
            setContent(""); // clears form
          }}
          className="mt-4 rounded-lg border px-4 py-2"
        >
          Add Entry
        </button>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Your Entries</h2>

        <div className="mt-4 space-y-4">
          {entries.map((entry, index) => (
            <article key={index} className="rounded-xl border p-6">
              <h3 className="text-xl font-semibold">{entry.title}</h3>

              <p className="mt-2 text-gray-600">
                {entry.content}
              </p>

              <button
                onClick={() => {
                  setEntries(
                    entries.filter( 
                      (_, currentIndex) => currentIndex !== index // creates new array excluding deleted item
                    )
                  );
                }}
                className="mt-4 rounded-lg border px-3 py-1"
              >
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>

    </main>
  );
}
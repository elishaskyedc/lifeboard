"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getJournalEntries,
  saveJournalEntries,
} from "@/components/journalData";

export default function NewJournalEntryPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      {/* back link */}
      <Link
        href="/journal"
        className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--primary-dark)]"
      >
        ← Back to journal
      </Link>

      {/* page heading */}
      <div className="mt-6">
        <p className="text-sm font-semibold text-[var(--lavender)]">
          ✎ A little space for your thoughts
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          New entry ♡
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Take a moment to write down whatever is on your mind.
        </p>
      </div>

      {/* journal form */}
      <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <p className="text-sm font-semibold text-[var(--lavender)]">
          ✎ Write something
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[var(--lavender)]" />

        {/* title */}
        <input
          type="text"
          placeholder="Give your entry a title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="mt-6 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-semibold outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
        />

        {/* content */}
        <textarea
          placeholder="Write your thoughts here..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="mt-4 min-h-80 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-4 leading-relaxed outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
        />

        {/* actions */}
        <div className="mt-5 flex justify-end gap-3">
          <Link
            href="/journal"
            className="rounded-2xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-[var(--primary-soft)]"
          >
            Cancel
          </Link>

          <button
            onClick={() => {
                if (title.trim() === "" || content.trim() === "") {
                    return;
                }

                const entries = getJournalEntries();

                const newEntry = {
                    id: Date.now(),
                    title: title.trim(),
                    content: content.trim(),
                    date: new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    }),
                };

                saveJournalEntries([newEntry, ...entries]);

                router.push("/journal");
            }}
            className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold transition hover:opacity-90"
          >
            Save entry ♡
          </button>
        </div>
      </section>
    </main>
  );
}
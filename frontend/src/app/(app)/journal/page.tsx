"use client";

import Link from "next/link";
import { useState } from "react";
import {
  getJournalEntries,
  type JournalEntry,
} from "@/components/journalData";

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    return getJournalEntries();
  });

  const [search, setSearch] = useState("");

  const filteredEntries = entries.filter((entry) => {
    const searchText = search.toLowerCase();

    return (
      entry.title.toLowerCase().includes(searchText) ||
      entry.content.toLowerCase().includes(searchText)
    );
  });

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      {/* page heading */}
      <div>
        <p className="text-sm font-semibold text-[var(--lavender)]">
          ✎ A little space for your thoughts
        </p>

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Your journal ♡
        </h1>

        <p className="mt-2 text-[var(--muted)]">
          Look back on your thoughts, memories and little moments.
        </p>
      </div>

      {/* search + new entry */}
      <section className="mt-8 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search your entries..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
          />
        </div>

        <Link
          href="/journal/new"
          className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold transition hover:opacity-90"
        >
          + New entry ♡
        </Link>
      </section>

      {/* entry count */}
      <div className="mt-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--lavender)]">
            ♡ Your thoughts
          </p>

          <h2 className="mt-1 text-2xl font-extrabold">
            September 2026
          </h2>
        </div>

        <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-sm font-semibold">
          {filteredEntries.length}{" "}
          {filteredEntries.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* entries */}
      {filteredEntries.length === 0 ? (
        <div className="mt-5 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-2xl">✎</p>

          <p className="mt-3 font-bold">
            No entries found
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Try a different search or write a new entry.
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {filteredEntries.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
            >
              <p className="text-xs font-semibold text-[var(--lavender)]">
                {entry.date}
              </p>

              <div className="mt-3 h-1 w-12 rounded-full bg-[var(--lavender)]" />

              <h3 className="mt-4 text-xl font-extrabold">
                {entry.title}
              </h3>

              <p className="mt-3 line-clamp-3 whitespace-pre-wrap leading-relaxed text-[var(--muted)]">
                {entry.content}
              </p>

              <Link
                href={`/journal/${entry.id}`}
                className="mt-5 inline-block rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
              >
                Read entry →
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
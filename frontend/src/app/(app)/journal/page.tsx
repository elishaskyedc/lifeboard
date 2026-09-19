"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  getJournalEntries,
  getJournalEntriesSnapshot,
  getJournalEntriesServerSnapshot,
  saveJournalEntries,
  subscribeToJournalEntries,
  type JournalEntry,
} from "@/components/journalData";

export default function JournalPage() {
  const entries: JournalEntry[] = JSON.parse(
    useSyncExternalStore(
      subscribeToJournalEntries,
      getJournalEntriesSnapshot,
      getJournalEntriesServerSnapshot
    )
  );

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId === null) {
      return;
    }

    const entries = getJournalEntries();

    const updatedEntries = entries.filter(
      (entry) => entry.id !== deleteId
    );

    saveJournalEntries(updatedEntries);
    setDeleteId(null);
  };

  const filteredEntries = entries.filter((entry) => {
    const searchText = search.toLowerCase();

    return (
      entry.title.toLowerCase().includes(searchText) ||
      entry.content.toLowerCase().includes(searchText)
    );
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sort === "oldest") {
      return a.id - b.id;
    }

    if (sort === "a-z") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "z-a") {
      return b.title.localeCompare(a.title);
    }

    return b.id - a.id;
  });

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-[var(--lavender)]">
              ✎ A little space for your thoughts
            </p>

            <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
              Journal ♡
            </h1>

            <p className="mt-2 text-[var(--muted)]">
              Write things down, keep little memories, and come back to them
              whenever you like.
            </p>
          </div>

          <Link
            href="/journal/new"
            className="shrink-0 rounded-2xl bg-[var(--primary)] px-5 py-3 font-bold transition hover:opacity-90"
          >
            + New entry ♡
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your journal..."
            className="min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
          />

          <div className="relative shrink-0">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-semibold transition hover:bg-[var(--primary-soft)]"
            >
              Sort:{" "}
              {sort === "newest" && "Newest"}
              {sort === "oldest" && "Oldest"}
              {sort === "a-z" && "A → Z"}
              {sort === "z-a" && "Z → A"}
              <span className="ml-2 text-[var(--muted)]">
                {sortOpen ? "↑" : "↓"}
              </span>
            </button>

            {sortOpen && (
              <div className="absolute right-0 z-10 mt-2 w-44 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-2 shadow-lg">
                <button
                  onClick={() => {
                    setSort("newest");
                    setSortOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--primary-soft)]"
                >
                  ♡ Newest first
                </button>

                <button
                  onClick={() => {
                    setSort("oldest");
                    setSortOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--primary-soft)]"
                >
                  ♡ Oldest first
                </button>

                <button
                  onClick={() => {
                    setSort("a-z");
                    setSortOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--primary-soft)]"
                >
                  ♡ A → Z
                </button>

                <button
                  onClick={() => {
                    setSort("z-a");
                    setSortOpen(false);
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition hover:bg-[var(--primary-soft)]"
                >
                  ♡ Z → A
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-5">
          {sortedEntries.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-10 text-center">
              <p className="text-3xl">✎</p>

              <h2 className="mt-3 text-xl font-extrabold">
                No journal entries found
              </h2>

              <p className="mt-2 text-sm text-[var(--muted)]">
                {search
                  ? "Try searching for something else."
                  : "Start writing your first little entry."}
              </p>
            </div>
          ) : (
            sortedEntries.map((entry) => (
              <article
                key={entry.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-[var(--lavender)]">
                  {entry.date}
                </p>

                <div className="mt-4 h-1 w-16 rounded-full bg-[var(--lavender)]" />

                <h2 className="mt-5 text-2xl font-extrabold">
                  {entry.title}
                </h2>

                <p className="mt-3 line-clamp-3 leading-relaxed text-[var(--muted)]">
                  {entry.content}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/journal/${entry.id}`}
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                  >
                    Read entry →
                  </Link>

                  <Link
                    href={`/journal/${entry.id}/edit`}
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                  >
                    Delete
                  </button>
                </div>

                {deleteId === entry.id && (
                  <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4">
                    <p className="font-semibold">
                      Delete this entry?
                    </p>

                    <p className="mt-1 text-sm text-[var(--muted)]">
                      This cannot be undone.
                    </p>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => setDeleteId(null)}
                        className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--surface)]"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={confirmDelete}
                        className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold transition hover:opacity-90"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
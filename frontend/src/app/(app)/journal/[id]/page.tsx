"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getJournalEntries } from "@/components/journalData";

export default function JournalEntryPage() {
  const params = useParams();

  const entryId = Number(params.id);

  const entries = getJournalEntries();

  const entry = entries.find((entry) => entry.id === entryId);

  if (!entry) {
    return (
      <main className="min-h-screen bg-[var(--background)] p-8">
        <Link
          href="/journal"
          className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--primary-dark)]"
        >
          ← Back to journal
        </Link>

        <div className="mt-8 rounded-3xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-2xl">✎</p>

          <h1 className="mt-3 text-xl font-extrabold">
            Entry not found
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            This journal entry does not exist.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <Link
        href="/journal"
        className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--primary-dark)]"
      >
        ← Back to journal
      </Link>

      <article className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="text-sm font-semibold text-[var(--lavender)]">
          {entry.date}
        </p>

        <div className="mt-4 h-1 w-16 rounded-full bg-[var(--lavender)]" />

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
          {entry.title}
        </h1>

        <p className="mt-8 whitespace-pre-wrap leading-8 text-[var(--foreground)]">
          {entry.content}
        </p>
      </article>
    </main>
  );
}
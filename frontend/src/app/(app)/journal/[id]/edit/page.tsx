"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getJournalEntries,
  saveJournalEntries,
} from "@/components/journalData";
import DatePicker from "@/components/DatePicker";

export default function EditJournalEntryPage() {
  const params = useParams();
  const entryId = Number(params.id);

  const entries = getJournalEntries();
  const entry = entries.find((entry) => entry.id === entryId);

  const getToday = () => {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  };

  const convertDateToInputValue = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return getToday();
    }

    return `${parsedDate.getFullYear()}-${String(
      parsedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;
  };

  const [title, setTitle] = useState(entry?.title ?? "");
  const [content, setContent] = useState(entry?.content ?? "");
  const [date, setDate] = useState(
    entry ? convertDateToInputValue(entry.date) : ""
  );

  const router = useRouter();

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

  const handleSave = () => {
    if (
      title.trim() === "" ||
      content.trim() === "" ||
      date === ""
    ) {
      return;
    }

    const formattedDate = new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const updatedEntries = entries.map((journalEntry) => {
      if (journalEntry.id === entry.id) {
        return {
          ...journalEntry,
          title: title.trim(),
          content: content.trim(),
          date: formattedDate,
        };
      }

      return journalEntry;
    });

    saveJournalEntries(updatedEntries);

    router.push(`/journal/${entry.id}`);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href={`/journal/${entry.id}`}
          className="text-sm font-semibold text-[var(--muted)] transition hover:text-[var(--primary-dark)]"
        >
          ← Back to entry
        </Link>

        <div className="mt-6">
          <p className="text-sm font-semibold text-[var(--lavender)]">
            ✎ Make a little change
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            Edit entry ♡
          </h1>

          <p className="mt-2 text-[var(--muted)]">
            Update your thoughts whenever you like.
          </p>
        </div>

        <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--lavender)]">
            ✎ Your entry
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[var(--lavender)]" />

          <label className="mt-6 block text-sm font-bold">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 font-semibold outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
          />

          <label className="mt-5 block text-sm font-bold">
            Date
          </label>

          <div className="mt-2">
            <DatePicker value={date} onChange={setDate} />
          </div>

          <label className="mt-5 block text-sm font-bold">
            Entry
          </label>

          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="mt-2 min-h-80 w-full resize-y rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-4 leading-relaxed outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
          />

          <div className="mt-5 flex justify-end gap-3">
            <Link
              href={`/journal/${entry.id}`}
              className="rounded-2xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:bg-[var(--primary-soft)]"
            >
              Cancel
            </Link>

            <button
              onClick={handleSave}
              className="rounded-2xl bg-[var(--primary)] px-6 py-3 font-bold transition hover:opacity-90"
            >
              Save changes ♡
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
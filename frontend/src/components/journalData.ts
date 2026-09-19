export type JournalEntry = {
  id: number;
  title: string;
  content: string;
  date: string;
};

export const defaultJournalEntries: JournalEntry[] = [
  {
    id: 1,
    title: "A little update",
    content:
      "Today was a pretty good day. I got a few things done and spent some time thinking about what I want to work on next.",
    date: "9 September 2026",
  },
  {
    id: 2,
    title: "Getting organised",
    content:
      "I've been trying to get more organised lately and make better use of my time. There are quite a few things I want to accomplish this month.",
    date: "7 September 2026",
  },
];

const STORAGE_KEY = "journalEntries";

export function getJournalEntries(): JournalEntry[] {
  if (typeof window === "undefined") {
    return defaultJournalEntries;
  }

  const savedEntries = localStorage.getItem(STORAGE_KEY);

  if (!savedEntries) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultJournalEntries)
    );

    return defaultJournalEntries;
  }

  return JSON.parse(savedEntries);
}

export function saveJournalEntries(entries: JournalEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

  window.dispatchEvent(new Event("journalEntriesUpdated"));
}

export function subscribeToJournalEntries(callback: () => void) {
  window.addEventListener("journalEntriesUpdated", callback);

  return () => {
    window.removeEventListener("journalEntriesUpdated", callback);
  };
}

export function getJournalEntriesSnapshot() {
  return JSON.stringify(getJournalEntries());
}

export function getJournalEntriesServerSnapshot() {
  return JSON.stringify(defaultJournalEntries);
}
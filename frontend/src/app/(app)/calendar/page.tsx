"use client";

import { useId, useState } from "react";

type Event = {
  id: string;
  title: string;
  day: number;
  month: number;
  year: number;
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const month = currentDate.toLocaleDateString("en-GB", {
    month: "long",
  });

  const year = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const daysInMonth = new Date(
    year,
    currentMonth + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    year,
    currentMonth,
    1
  ).getDay();

  // Convert Sunday = 0 into Monday = 0
  const adjustedFirstDay =
    firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState<Event[]>([]);

  const eventId = useId();

  const selectedDayEvents = events.filter(
    (event) =>
      event.day === selectedDay &&
      event.month === currentMonth &&
      event.year === year
  );

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, currentMonth - 1, 1)
    );

    setSelectedDay(null);
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, currentMonth + 1, 1)
    );

    setSelectedDay(null);
  };

  const addEvent = () => {
    if (eventTitle.trim() === "" || selectedDay === null) {
      return;
    }

    const newEvent: Event = {
      id: `${eventId}-${events.length}`,
      title: eventTitle.trim(),
      day: selectedDay,
      month: currentMonth,
      year,
    };

    setEvents([...events, newEvent]);
    setEventTitle("");
  };

  const deleteEvent = (id: string) => {
    setEvents(
      events.filter((event) => event.id !== id)
    );
  };

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <div>
          <p className="text-sm font-semibold text-[var(--lavender)]">
            ♡ A little space for your plans
          </p>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            Calendar ♡
          </h1>

          <p className="mt-2 text-[var(--muted)]">
            Keep track of your plans, events, and little things
            coming up.
          </p>
        </div>

        {/* Calendar card */}
        <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

          {/* Month navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goToPreviousMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] font-bold transition hover:bg-[var(--primary-soft)]"
              aria-label="Previous month"
            >
              ←
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-extrabold capitalize">
                {month} {year}
              </h2>

              <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[var(--lavender)]" />
            </div>

            <button
              onClick={goToNextMonth}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] font-bold transition hover:bg-[var(--primary-soft)]"
              aria-label="Next month"
            >
              →
            </button>
          </div>

          {/* Weekday headings */}
          <div className="mt-8 grid grid-cols-7 gap-2 text-center text-sm font-bold text-[var(--muted)]">
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
            <div>Sun</div>
          </div>

          {/* Calendar days */}
          <div className="mt-3 grid grid-cols-7 gap-2">

            {/* Empty spaces */}
            {Array.from({
              length: adjustedFirstDay,
            }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {/* Days */}
            {Array.from({
              length: daysInMonth,
            }).map((_, index) => {
              const day = index + 1;

              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                year === today.getFullYear();

              const isSelected = day === selectedDay;

              const dayEvents = events.filter(
                (event) =>
                  event.day === day &&
                  event.month === currentMonth &&
                  event.year === year
              );

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative flex min-h-24 flex-col items-center justify-start rounded-2xl border p-2 text-sm font-semibold transition ${
                    isSelected
                      ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-dark)]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)]"
                  }`}
                >
                  {/* Day number */}
                  <span
                    className={
                      isToday
                        ? "font-extrabold underline decoration-[var(--primary)] decoration-2 underline-offset-4"
                        : ""
                    }
                  >
                    {day}
                  </span>

                  {/* Event titles */}
                  {dayEvents.length > 0 && (
                    <div className="mt-2 w-full space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <p
                          key={event.id}
                          className="truncate rounded-md bg-[var(--primary-soft)] px-2 py-1 text-xs font-semibold text-[var(--primary-dark)]"
                          title={event.title}
                        >
                          {event.title}
                        </p>
                      ))}

                      {dayEvents.length > 2 && (
                        <p className="text-[10px] font-semibold text-[var(--muted)]">
                          + more
                        </p>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected day / schedule */}
        {selectedDay !== null && (
          <section className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

            <p className="text-sm font-semibold text-[var(--lavender)]">
              ✦ Your plans
            </p>

            <div className="mt-3 h-1 w-16 rounded-full bg-[var(--lavender)]" />

            <h2 className="mt-5 text-2xl font-extrabold">
              {selectedDay} {month} {year}
            </h2>

            {/* Existing events */}
            {selectedDayEvents.length === 0 ? (
              <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-5">
                <p className="font-semibold">
                  Nothing planned yet ♡
                </p>

                <p className="mt-1 text-sm text-[var(--muted)]">
                  Add something to your day below.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-3">
                {selectedDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4"
                  >
                    <p className="font-semibold">
                      {event.title}
                    </p>

                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="rounded-full px-3 py-1 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Add event */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                placeholder="Add something to your day..."
                value={eventTitle}
                onChange={(event) =>
                  setEventTitle(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addEvent();
                  }
                }}
                className="min-w-0 flex-1 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
              />

              <button
                onClick={addEvent}
                className="rounded-2xl bg-[var(--primary)] px-5 py-3 font-bold transition hover:opacity-90"
              >
                + Add event ♡
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
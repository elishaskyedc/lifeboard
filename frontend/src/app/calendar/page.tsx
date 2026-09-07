"use client";

import { useState } from "react";

type Event = {
  id: number; // gives each event an id
  title: string;
  day: number;
  month: number;
  year: number;
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const month = currentDate.toLocaleString("default", { // gets month name
    month: "long",
  });

  const year = currentDate.getFullYear(); // gets year

  const daysInMonth = new Date(
    year,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    year,
    currentDate.getMonth(),
    1
  ).getDay(); // returns the weekday as a number: Sunday = 0, Monday = 1, ... Saturday = 6

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  // react state variable: stores which calendar day the user has selected
  
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const selectedDayEvents = events.filter(
    (event) =>
      event.day === selectedDay &&
      event.month === currentDate.getMonth() &&
      event.year === currentDate.getFullYear()
  ); // only show events belonging to selected day and current month/year

  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between">
        {/* previous / next buttons */}
        <button
          onClick={() => {
            setCurrentDate( // previous button
              new Date(year, currentDate.getMonth() - 1, 1)
            );

            setSelectedDay(null); // clear selected day
          }}
          className="rounded-lg border px-4 py-2"
        >
          ←
        </button>

        <h1 className="text-4xl font-bold">
          {month} {year}
        </h1>

        <button
          onClick={() => {
            setCurrentDate(
              new Date(year, currentDate.getMonth() + 1, 1) // next button
            );

            setSelectedDay(null);
          }}
          className="rounded-lg border px-4 py-2"
        >
          →
        </button>
      </div>

      {/* calendar card */}
      <div className="mt-8 rounded-xl border p-6">
        {/* calendar grid */}
        <div className="grid grid-cols-7 gap-2">

          {/* weekday headings */}
          <div className="text-center font-semibold">Sun</div>
          <div className="text-center font-semibold">Mon</div>
          <div className="text-center font-semibold">Tue</div>
          <div className="text-center font-semibold">Wed</div>
          <div className="text-center font-semibold">Thu</div>
          <div className="text-center font-semibold">Fri</div>
          <div className="text-center font-semibold">Sat</div>

          {/* empty spaces before first day */}
          {Array.from({ length: firstDayOfMonth }, (_, index) => (
            <div key={`empty-${index}`} />
          ))}

          {/* calendar days */}
          {Array.from({ length: daysInMonth }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setSelectedDay(index + 1)}
              className={`rounded-lg border p-4 text-center ${
                index + 1 === today.getDate() &&
                  currentDate.getMonth() === today.getMonth() &&
                  currentDate.getFullYear() === today.getFullYear() 
                  ? "font-bold underline" 
                  : ""
              } ${
                index + 1 === selectedDay
                  ? "bg-pink-200 font-bold"
                  : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* selected date */}
        {selectedDay !== null && (
          <p className="mt-6 text-lg">
            Selected date: {month} {selectedDay}, {year}
          </p>
        )}

        {/* schedule for selected date */}
        {selectedDay !== null && (
          <section className="mt-6 rounded-xl border p-6">
            <h2 className="text-xl font-semibold">
              Schedule for {month} {selectedDay}
            </h2>

            {selectedDayEvents.length === 0 ? ( // conditional expression: if no events = show no events scheduled | otherwise show events
              <p className="mt-2 text-gray-600">
                No events scheduled yet.
              </p>
            ) : (
              <div className="mt-4 space-y-2">
                {selectedDayEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-lg border p-3"
                  >
                    {event.title}

                    <button
                      onClick={() => {
                        setEvents(
                          events.filter(
                            (currentEvent) => currentEvent.id !== event.id
                          )
                        );
                      }}
                      className="ml-4 rounded-lg border px-3 py-1"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Add an event..."
              value={eventTitle}
              onChange={(event) => setEventTitle(event.target.value)}
              className="mt-4 rounded-lg border px-4 py-2"
            />

            <button
              onClick={() => {
                if (eventTitle.trim() === "") {
                  return;
                }

                setEvents([
                  ...events, // keep all events that exist
                  {
                    id: Date.now(),
                    title: eventTitle, // add new event using whatever user typed
                    day: selectedDay,
                    month: currentDate.getMonth(),
                    year: currentDate.getFullYear(),
                  },
                ]);

                setEventTitle(""); // clears input after event is added
              }}
              className="ml-2 rounded-lg border px-4 py-2"
            >
              Add Event
            </button>
          </section>
        )}
      </div>
    </main>
  );
}
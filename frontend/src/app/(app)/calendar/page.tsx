"use client";

import { useId, useState } from "react";

type Event = {
  id: string;
  title: string;
  day: number;
  month: number;
  year: number;
  startTime: string;
  endTime: string;
  allDay: boolean;
  timeFormat: "12" | "24";
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const [view, setView] = useState<"month" | "week">("month");

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

  // makes monday the first day of week
  const adjustedFirstDay =
    firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const today = new Date();

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [eventTitle, setEventTitle] = useState("");

  // lets user choose which clock format to use
  const [timeFormat, setTimeFormat] = useState<"12" | "24">("12");

  // 12 hour time values
  const [startHour12, setStartHour12] = useState("1");
  const [startMinute12, setStartMinute12] = useState("00");
  const [startPeriod, setStartPeriod] = useState<"AM" | "PM">("AM");

  const [endHour12, setEndHour12] = useState("2");
  const [endMinute12, setEndMinute12] = useState("00");
  const [endPeriod, setEndPeriod] = useState<"AM" | "PM">("AM");

  // 24 hour time values
  const [startHour24, setStartHour24] = useState("13");
  const [startMinute24, setStartMinute24] = useState("00");

  const [endHour24, setEndHour24] = useState("14");
  const [endMinute24, setEndMinute24] = useState("00");

  const [allDay, setAllDay] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState("");

  const eventId = useId();

  const selectedDayEvents = events.filter(
    (event) =>
      event.day === selectedDay &&
      event.month === currentMonth &&
      event.year === year
  );

  // gets monday of current week
  const getWeekStart = (date: Date) => {
    const day = date.getDay();
    const difference = day === 0 ? -6 : 1 - day;

    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() + difference);

    return weekStart;
  };

  const weekStart = getWeekStart(currentDate);

  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);

    return date;
  });

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(year, currentMonth - 1, 1)
    );
    setSelectedDay(null);
    setError("");
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(year, currentMonth + 1, 1)
    );
    setSelectedDay(null);
    setError("");
  };

  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentDate);
    previousWeek.setDate(currentDate.getDate() - 7);

    setCurrentDate(previousWeek);
    setSelectedDay(null);
    setError("");
  };

  const goToNextWeek = () => {
    const nextWeek = new Date(currentDate);
    nextWeek.setDate(currentDate.getDate() + 7);

    setCurrentDate(nextWeek);
    setSelectedDay(null);
    setError("");
  };

  // converts 12 hour time into 24 hour time for storing
  const convert12To24 = (
    hour: string,
    minute: string,
    period: "AM" | "PM"
  ) => {
    let hours = Number(hour);

    if (period === "AM" && hours === 12) {
      hours = 0;
    }

    if (period === "PM" && hours !== 12) {
      hours += 12;
    }

    return `${String(hours).padStart(2, "0")}:${minute.padStart(
      2,
      "0"
    )}`;
  };

  // only allows numbers and limits the value to a maximum
  const handleNumberInput = (
    value: string,
    max: number,
    setter: (value: string) => void
  ) => {
    const numbersOnly = value.replace(/\D/g, "");

    if (numbersOnly === "") {
      setter("");
      return;
    }

    const number = Number(numbersOnly);

    if (number <= max) {
      setter(numbersOnly);
    }
  };

  const addEvent = () => {
    setError("");

    // don't add event if title or day is missing
    if (
      eventTitle.trim() === "" ||
      selectedDay === null
    ) {
      setError("Please add a title for your event.");
      return;
    }

    // all day events don't need a time
    if (allDay) {
      const newEvent: Event = {
        id: `${eventId}-${events.length}`,
        title: eventTitle.trim(),
        day: selectedDay,
        month: currentMonth,
        year,
        startTime: "",
        endTime: "",
        allDay: true,
        timeFormat,
      };

      setEvents([...events, newEvent]);

      // clear form after adding event
      setEventTitle("");
      setAllDay(false);

      return;
    }

    let newStartTime = "";
    let newEndTime = "";

    // make sure all time fields contain values
    if (timeFormat === "12") {
      if (
        startHour12 === "" ||
        startMinute12 === "" ||
        endHour12 === "" ||
        endMinute12 === ""
      ) {
        setError("Please enter a complete start and end time.");
        return;
      }

      const startHour = Number(startHour12);
      const startMinute = Number(startMinute12);
      const endHour = Number(endHour12);
      const endMinute = Number(endMinute12);

      if (
        startHour < 1 ||
        startHour > 12 ||
        endHour < 1 ||
        endHour > 12
      ) {
        setError("Hours must be between 1 and 12.");
        return;
      }

      if (
        startMinute < 0 ||
        startMinute > 59 ||
        endMinute < 0 ||
        endMinute > 59
      ) {
        setError("Minutes must be between 00 and 59.");
        return;
      }

      newStartTime = convert12To24(
        startHour12,
        startMinute12,
        startPeriod
      );

      newEndTime = convert12To24(
        endHour12,
        endMinute12,
        endPeriod
      );
    } else {
      if (
        startHour24 === "" ||
        startMinute24 === "" ||
        endHour24 === "" ||
        endMinute24 === ""
      ) {
        setError("Please enter a complete start and end time.");
        return;
      }

      const startHour = Number(startHour24);
      const startMinute = Number(startMinute24);
      const endHour = Number(endHour24);
      const endMinute = Number(endMinute24);

      if (
        startHour < 0 ||
        startHour > 23 ||
        endHour < 0 ||
        endHour > 23
      ) {
        setError("Hours must be between 00 and 23.");
        return;
      }

      if (
        startMinute < 0 ||
        startMinute > 59 ||
        endMinute < 0 ||
        endMinute > 59
      ) {
        setError("Minutes must be between 00 and 59.");
        return;
      }

      newStartTime = `${startHour24.padStart(
        2,
        "0"
      )}:${startMinute24.padStart(2, "0")}`;

      newEndTime = `${endHour24.padStart(
        2,
        "0"
      )}:${endMinute24.padStart(2, "0")}`;
    }

    // make sure event doesn't end before it starts
    if (newEndTime <= newStartTime) {
      setError("End time must be later than start time.");
      return;
    }

    const newEvent: Event = {
      id: `${eventId}-${events.length}`,
      title: eventTitle.trim(),
      day: selectedDay,
      month: currentMonth,
      year,
      startTime: newStartTime,
      endTime: newEndTime,
      allDay: false,
      timeFormat,
    };

    setEvents([...events, newEvent]);

    // clear form after adding event
    setEventTitle("");
    setStartHour12("1");
    setStartMinute12("00");
    setStartPeriod("AM");
    setEndHour12("2");
    setEndMinute12("00");
    setEndPeriod("AM");
    setStartHour24("13");
    setStartMinute24("00");
    setEndHour24("14");
    setEndMinute24("00");
  };

  const deleteEvent = (id: string) => {
    setEvents(
      events.filter((event) => event.id !== id)
    );
  };

  const selectWeekDay = (date: Date) => {
    setCurrentDate(date);
    setSelectedDay(date.getDate());
    setError("");
  };

  // formats stored time according to event's clock format
  const formatTime = (
    time: string,
    format: "12" | "24"
  ) => {
    if (!time) {
      return "";
    }

    const [hours, minutes] = time.split(":");
    const hourNumber = Number(hours);

    if (format === "24") {
      return `${String(hourNumber).padStart(
        2,
        "0"
      )}:${minutes}`;
    }

    const period = hourNumber >= 12 ? "PM" : "AM";

    const displayHour =
      hourNumber % 12 === 0 ? 12 : hourNumber % 12;

    return `${displayHour}:${minutes} ${period}`;
  };

  // shows either event time or "all day"
  const getEventTime = (event: Event) => {
    if (event.allDay) {
      return "All day";
    }

    return `${formatTime(
      event.startTime,
      event.timeFormat
    )} – ${formatTime(
      event.endTime,
      event.timeFormat
    )}`;
  };

  // shared styling for time inputs
  const timeControlClass =
    "w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-3 text-center font-semibold text-[var(--foreground)] outline-none transition hover:border-[var(--primary)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-soft)]";

  return (
    <main className="min-h-screen bg-[var(--background)] p-8">
      <div className="mx-auto max-w-6xl">

        {/* page heading */}
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

        {/* calendar card */}
        <section className="mt-8 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">

          {/* calendar navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={
                view === "month"
                  ? goToPreviousMonth
                  : goToPreviousWeek
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] font-bold transition hover:bg-[var(--primary-soft)]"
              aria-label={
                view === "month"
                  ? "Previous month"
                  : "Previous week"
              }
            >
              ←
            </button>

            <div className="text-center">
              <h2 className="text-2xl font-extrabold capitalize">
                {view === "month"
                  ? `${month} ${year}`
                  : `${weekDays[0].toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                      }
                    )} – ${weekDays[6].toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}`}
              </h2>

              <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[var(--lavender)]" />
            </div>

            <button
              onClick={
                view === "month"
                  ? goToNextMonth
                  : goToNextWeek
              }
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] font-bold transition hover:bg-[var(--primary-soft)]"
              aria-label={
                view === "month"
                  ? "Next month"
                  : "Next week"
              }
            >
              →
            </button>
          </div>

          {/* month / week toggle */}
          <div className="mt-6 flex justify-center">
            <div className="flex rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-1">
              <button
                onClick={() => setView("month")}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  view === "month"
                    ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Month
              </button>

              <button
                onClick={() => setView("week")}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  view === "week"
                    ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                Week
              </button>
            </div>
          </div>

          {/* month view */}
          {view === "month" && (
            <>
              <div className="mt-8 grid grid-cols-7 gap-2 text-center text-sm font-bold text-[var(--muted)]">
                <div>Mon</div>
                <div>Tue</div>
                <div>Wed</div>
                <div>Thu</div>
                <div>Fri</div>
                <div>Sat</div>
                <div>Sun</div>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-2">
                {Array.from({
                  length: adjustedFirstDay,
                }).map((_, index) => (
                  <div key={`empty-${index}`} />
                ))}

                {Array.from({
                  length: daysInMonth,
                }).map((_, index) => {
                  const day = index + 1;

                  const isToday =
                    day === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    year === today.getFullYear();

                  const isSelected =
                    day === selectedDay;

                  const dayEvents = events.filter(
                    (event) =>
                      event.day === day &&
                      event.month === currentMonth &&
                      event.year === year
                  );

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDay(day)
                      }
                      className={`relative flex min-h-24 flex-col items-center justify-start rounded-2xl border p-2 text-sm font-semibold transition ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary-dark)]"
                          : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)]"
                      }`}
                    >
                      <span
                        className={
                          isToday
                            ? "font-extrabold underline decoration-[var(--primary)] decoration-2 underline-offset-4"
                            : ""
                        }
                      >
                        {day}
                      </span>

                      {dayEvents.length > 0 && (
                        <div className="mt-2 w-full space-y-1">
                          {dayEvents
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event.id}
                                className="rounded-md bg-[var(--primary-soft)] px-2 py-1 text-left text-xs font-semibold text-[var(--primary-dark)]"
                                title={event.title}
                              >
                                <p className="truncate">
                                  {event.title}
                                </p>

                                <p className="truncate text-[10px]">
                                  {getEventTime(event)}
                                </p>
                              </div>
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
            </>
          )}

          {/* week view */}
          {view === "week" && (
            <div className="mt-8 overflow-x-auto pb-3">
              <div className="grid min-w-[900px] grid-cols-7 gap-2">
                {weekDays.map((date) => {
                  const day = date.getDate();
                  const dateMonth = date.getMonth();
                  const dateYear = date.getFullYear();

                  const isToday =
                    day === today.getDate() &&
                    dateMonth === today.getMonth() &&
                    dateYear === today.getFullYear();

                  const isSelected =
                    selectedDay === day &&
                    currentMonth === dateMonth &&
                    year === dateYear;

                  const dayEvents = events.filter(
                    (event) =>
                      event.day === day &&
                      event.month === dateMonth &&
                      event.year === dateYear
                  );

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() =>
                        selectWeekDay(date)
                      }
                      className={`flex min-h-72 min-w-0 flex-col rounded-2xl border p-3 text-left transition ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary-soft)]"
                          : "border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-soft)]"
                      }`}
                    >
                      <p className="text-center text-xs font-bold uppercase text-[var(--muted)]">
                        {date.toLocaleDateString(
                          "en-GB",
                          {
                            weekday: "short",
                          }
                        )}
                      </p>

                      <p
                        className={`mt-2 text-center text-xl font-extrabold ${
                          isToday
                            ? "text-[var(--primary-dark)] underline decoration-[var(--primary)] decoration-2 underline-offset-4"
                            : ""
                        }`}
                      >
                        {day}
                      </p>

                      <div className="mt-4 min-w-0 space-y-2">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="min-w-0 rounded-lg bg-[var(--primary-soft)] px-2 py-2 text-xs font-semibold text-[var(--primary-dark)]"
                            title={event.title}
                          >
                            <p className="truncate">
                              {event.title}
                            </p>

                            <p className="mt-1 truncate text-[10px]">
                              {getEventTime(event)}
                            </p>
                          </div>
                        ))}

                        {dayEvents.length === 0 && (
                          <p className="text-center text-xs text-[var(--muted)]">
                            No plans
                          </p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* selected day / schedule */}
        {selectedDay !== null && (
          <section className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <p className="text-sm font-semibold text-[var(--lavender)]">
              ✦ Your plans
            </p>

            <div className="mt-3 h-1 w-16 rounded-full bg-[var(--lavender)]" />

            <h2 className="mt-5 text-2xl font-extrabold">
              {selectedDay} {month} {year}
            </h2>

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
                    <div>
                      <p className="font-semibold">
                        {event.title}
                      </p>

                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {getEventTime(event)}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        deleteEvent(event.id)
                      }
                      className="rounded-full px-3 py-1 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* add event form */}
            <div className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Add something to your day..."
                value={eventTitle}
                onChange={(event) => {
                  setEventTitle(event.target.value);
                  setError("");
                }}
                className="w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--lavender)]"
              />

              {/* all day events don't need a time */}
              <label className="flex cursor-pointer items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={allDay}
                  onChange={(event) => {
                    setAllDay(event.target.checked);
                    setError("");
                  }}
                  className="h-4 w-4 accent-[var(--primary)]"
                />

                All day
              </label>

              {!allDay && (
                <div className="space-y-4">

                  {/* choose between 12 and 24 hour time */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                      Time format
                    </label>

                    <div className="flex w-fit rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-1">
                      <button
                        type="button"
                        onClick={() => {
                          setTimeFormat("12");
                          setError("");
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                          timeFormat === "12"
                            ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        12-hour
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTimeFormat("24");
                          setError("");
                        }}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                          timeFormat === "24"
                            ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                            : "text-[var(--muted)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        24-hour
                      </button>
                    </div>
                  </div>

                  {timeFormat === "12" ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* start time */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                          Start time
                        </label>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={startHour12}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                12,
                                setStartHour12
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="Start hour"
                            placeholder="1"
                          />

                          <span className="font-extrabold text-[var(--muted)]">
                            :
                          </span>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={startMinute12}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                59,
                                setStartMinute12
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="Start minutes"
                            placeholder="00"
                          />

                          <div className="flex rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-1">
                            <button
                              type="button"
                              onClick={() => {
                                setStartPeriod("AM");
                                setError("");
                              }}
                              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                                startPeriod === "AM"
                                  ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
                              }`}
                            >
                              AM
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setStartPeriod("PM");
                                setError("");
                              }}
                              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                                startPeriod === "PM"
                                  ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
                              }`}
                            >
                              PM
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* end time */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                          End time
                        </label>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={endHour12}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                12,
                                setEndHour12
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="End hour"
                            placeholder="2"
                          />

                          <span className="font-extrabold text-[var(--muted)]">
                            :
                          </span>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={endMinute12}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                59,
                                setEndMinute12
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="End minutes"
                            placeholder="00"
                          />

                          <div className="flex rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEndPeriod("AM");
                                setError("");
                              }}
                              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                                endPeriod === "AM"
                                  ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
                              }`}
                            >
                              AM
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEndPeriod("PM");
                                setError("");
                              }}
                              className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
                                endPeriod === "PM"
                                  ? "bg-[var(--surface)] text-[var(--primary-dark)] shadow-sm"
                                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
                              }`}
                            >
                              PM
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      {/* 24 hour start time */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                          Start time
                        </label>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={startHour24}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                23,
                                setStartHour24
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="Start hour"
                            placeholder="13"
                          />

                          <span className="font-extrabold text-[var(--muted)]">
                            :
                          </span>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={startMinute24}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                59,
                                setStartMinute24
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="Start minutes"
                            placeholder="00"
                          />
                        </div>
                      </div>

                      {/* 24 hour end time */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold text-[var(--muted)]">
                          End time
                        </label>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            inputMode="numeric"
                            value={endHour24}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                23,
                                setEndHour24
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="End hour"
                            placeholder="14"
                          />

                          <span className="font-extrabold text-[var(--muted)]">
                            :
                          </span>

                          <input
                            type="text"
                            inputMode="numeric"
                            value={endMinute24}
                            onChange={(event) =>
                              handleNumberInput(
                                event.target.value,
                                59,
                                setEndMinute24
                              )
                            }
                            className={`${timeControlClass} flex-1`}
                            aria-label="End minutes"
                            placeholder="00"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <p className="text-sm font-semibold text-[var(--primary-dark)]">
                  {error}
                </p>
              )}

              <button
                onClick={addEvent}
                className="w-full rounded-2xl bg-[var(--primary)] px-5 py-3 font-bold transition hover:opacity-90 sm:w-auto"
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
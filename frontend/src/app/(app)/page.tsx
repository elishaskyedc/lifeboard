import Greeting from "@/components/Greeting";

export default function Home() {
  return (
    <section className="flex-1 p-8">
      {/* welcome section */}
      <div>
        <Greeting />

        <p className="mt-2 text-[var(--muted)]">
          Here is your little overview for today.
        </p>
      </div>

      {/* summary cards */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--primary-dark)]">
            ✦ Tasks
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[var(--primary)]" />

          <p className="mt-3 text-4xl font-extrabold">
            5
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            due today
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--mint)]">
            ♡ Habits
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-[var(--mint)]" />

          <p className="mt-3 text-4xl font-extrabold">
            3 / 4
          </p>

          <p className="mt-1 text-sm text-[var(--muted)]">
            completed today
          </p>
        </div>
      </div>

      {/* today's schedule */}
      <section className="mt-6 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--lavender)]">
              ♡ Today
            </p>

            <h2 className="mt-1 text-2xl font-extrabold">
              Your schedule
            </h2>
          </div>

          <span className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-sm font-semibold">
            3 events
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
            <p className="text-sm font-bold">09:00</p>
            <p className="mt-1 text-[var(--muted)]">
              Morning routine
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
            <p className="text-sm font-bold">12:00</p>
            <p className="mt-1 text-[var(--muted)]">
              Lunch
            </p>
          </div>

          <div className="rounded-2xl bg-[var(--surface-soft)] p-4">
            <p className="text-sm font-bold">15:00</p>
            <p className="mt-1 text-[var(--muted)]">
              Study
            </p>
          </div>
        </div>
      </section>

      {/* bottom cards */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--lavender)]">
            ✎ Journal
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            How are you feeling?
          </h2>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Take a moment to write something down.
          </p>

          <button className="mt-5 rounded-full bg-[var(--primary)] px-5 py-2 font-bold">
            Write an entry ♡
          </button>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
          <p className="text-sm font-semibold text-[var(--yellow)]">
            ✿ Quick actions
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            What would you like to do?
          </h2>

          <div className="mt-5 flex flex-wrap gap-3">
            <button className="rounded-full border border-[var(--border)] px-4 py-2 font-semibold">
              + Add task
            </button>

            <button className="rounded-full border border-[var(--border)] px-4 py-2 font-semibold">
              + Add habit
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
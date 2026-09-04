import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-6">
      <nav>
        <ul className="space-y-4">
          <li className="font-semibold">
            <Link href="/">Dashboard</Link>
          </li>

          <li>
            <Link href="/tasks">Tasks</Link>
          </li>

          <li>
            <Link href="/habits">Habits</Link>
          </li>

          <li>
            <Link href="/journal">Journal</Link>
          </li>

          <li>
            <Link href="/calendar">Calendar</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
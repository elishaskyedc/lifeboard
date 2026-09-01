export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-6">
      <nav>
        <ul className="space-y-4">
          <li className="font-semibold">Dashboard</li>
          <li>Tasks</li>
          <li>Habits</li>
          <li>Journal</li>
          <li>Calendar</li>
        </ul>
      </nav>
    </aside>
  );
}
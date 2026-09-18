type TaskItemProps = {
  title: string;
  completed: boolean;
  // actual state-changing logic
  onToggle: () => void;
  onDelete: () => void;
};

export default function TaskItem({
  title,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <li className="flex items-center justify-between rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
          className="h-5 w-5 accent-[var(--primary)]"
        />

        <span
          className={
            completed
              ? "text-[var(--muted)] line-through"
              : "font-semibold"
          }
        >
          {title}
        </span>
      </label>

      <button
        onClick={onDelete}
        className="rounded-full border border-[var(--border)] px-3 py-1 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary-dark)]"
      >
        Delete
      </button>
    </li>
  );
}
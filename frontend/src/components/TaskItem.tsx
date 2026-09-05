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
    <li className="rounded-lg border p-3">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={completed}
          onChange={onToggle}
        />

        <span>{title}</span>
      </label>

      <button
        onClick={onDelete}
        className="ml-4 rounded-lg border px-3 py-1"
      >
        Delete
      </button>
    </li>
  );
}
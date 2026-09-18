import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-8 py-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">memii</h2>
        <p className="text-sm text-[var(--muted)]">
          your little space to organise life ♡
        </p>
      </div>

      <ThemeToggle />
    </header>
  );
}
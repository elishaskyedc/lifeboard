"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "♡ Dashboard" },
    { href: "/tasks", label: "✦ Tasks" },
    { href: "/habits", label: "♡ Habits" },
    { href: "/journal", label: "✎ Journal" },
    { href: "/calendar", label: "♡ Calendar" },
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--border)] bg-[var(--surface)] p-6">
      <nav>
        <ul className="space-y-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-2xl px-4 py-3 font-semibold transition ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary-dark)]"
                      : "hover:bg-[var(--primary-soft)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
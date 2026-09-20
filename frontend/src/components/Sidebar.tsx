"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();

  const [width, setWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);

  const links = [
    { href: "/", label: "♡ Dashboard" },
    { href: "/tasks", label: "✦ Tasks" },
    { href: "/habits", label: "♡ Habits" },
    { href: "/journal", label: "✎ Journal" },
    { href: "/calendar", label: "♡ Calendar" },
  ];

  const startResizing = (event: React.MouseEvent) => {
    event.preventDefault();

    setIsResizing(true);

    const startX = event.clientX;
    const startWidth = width;

    const handleMouseMove = (event: MouseEvent) => {
      const newWidth = startWidth + (event.clientX - startX);

      const minimumWidth = 160;
      const maximumWidth = 256;

      const limitedWidth = Math.min(
        maximumWidth,
        Math.max(minimumWidth, newWidth)
      );

      setWidth(limitedWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <aside
      style={{ width }}
      className={`relative shrink-0 border-r border-[var(--border)] bg-[var(--surface)] p-6 ${
        isResizing ? "" : "transition-[width] duration-150"
      }`}
    >
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

      {/* Resize handle */}
      <div
        onMouseDown={startResizing}
        className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
        aria-label="Resize sidebar"
      />
    </aside>
  );
}
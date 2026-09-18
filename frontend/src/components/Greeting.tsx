"use client";

import { useEffect, useState } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const now = new Date();
      const hour = now.getHours(); //JS gets current hour from user's device

      if (hour >= 5 && hour < 12) {
        setGreeting("Good morning");
      } else if (hour >= 12 && hour < 18) {
        setGreeting("Good afternoon");
      } else if (hour >= 18 && hour < 22) {
        setGreeting("Good evening");
      } else {
        setGreeting("Good night");
      }

      setDate(
        now.toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };

    updateGreeting();

    const timer = setInterval(updateGreeting, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <p className="text-sm font-semibold text-[var(--primary-dark)]">
        {date}
      </p>

      <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
        {greeting}, Skye ♡
      </h1>
    </>
  );
}
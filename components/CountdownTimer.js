"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function CountdownTimer({ targetDate }) {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);

    return () => clearInterval(id);
  }, [targetDate]);

  const units = [
    { label: "dias", value: time?.days },
    { label: "horas", value: time?.hours },
    { label: "min", value: time?.minutes },
    { label: "seg", value: time?.seconds },
  ];

  return (
    <div className="flex gap-3">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-sm border border-accent font-mono text-2xl font-bold tabular-nums text-accent sm:h-20 sm:w-20 sm:text-3xl">
            {unit.value === undefined ? "--" : String(unit.value).padStart(2, "0")}
          </span>
          <span className="mt-1.5 text-[10px] uppercase tracking-widest text-muted">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}

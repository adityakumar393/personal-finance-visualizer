"use client";
import { useState } from "react";
import { currentMonthId } from "@/lib/budget";

export default function MonthPicker({ month, onChange }) {
  const [value, setValue] = useState(month || currentMonthId());

  function handle(e) {
    setValue(e.target.value);
    onChange(e.target.value);
  }

  return (
    <input
      type="month"
      value={value}
      onChange={handle}
      className="border rounded px-2 py-1 text-sm"
    />
  );
}

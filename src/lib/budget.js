// src/lib/budget.js
export function currentMonthId(date = new Date()) {
  return date.toISOString().slice(0, 7); // "YYYY-MM"
}

"use client";

export default function GlobalError({ error, reset }) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold">Something went wrong.</h2>
      <p className="mt-2 text-sm opacity-70">{error.message}</p>

      {/* Optional “Try again” button */}
      <button
        onClick={() => reset()}
        className="mt-4 underline text-sm text-primary"
      >
        Reload page
      </button>
    </div>
  );
}

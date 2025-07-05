"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex gap-6 p-4">
        <Link href="/">Transactions</Link>
        <Link href="/dashboard">Dashboard</Link>
      </nav>
    </header>
  );
}

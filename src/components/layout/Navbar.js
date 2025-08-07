// src/components/layout/Navbar.js
"use client";

import Link from "next/link";
import { signInWithGoogle, auth } from "@/lib/firebaseClient";
import { useUser } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, loading } = useUser();

  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center gap-6 p-4">
        <Link href="/">Transactions</Link>
        <Link href="/dashboard">Dashboard</Link>

        {/* right-aligned auth buttons */}
        <div className="ml-auto">
          {!loading && !user && (
            <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          )}

          {user && (
            <Button variant="outline" onClick={() => auth.signOut()}>
              Sign out&nbsp;(
              {user.displayName?.split(" ")[0] || user.email?.split("@")[0]})
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

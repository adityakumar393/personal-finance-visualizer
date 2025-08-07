"use client";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { auth } from "@/lib/firebaseClient";

const AuthCtx = createContext(null);
export const useUser = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      // refresh session cookie on login
      if (u) {
        const token = await getIdToken(u, /*forceRefresh=*/ true);
        await fetch("/api/auth/session", {
          method: "POST",
          body: JSON.stringify({ token }),
        });
      } else {
        await fetch("/api/auth/session", { method: "DELETE" });
      }
    });
  }, []);

  return <AuthCtx.Provider value={{ user, loading }}>{children}</AuthCtx.Provider>;
}

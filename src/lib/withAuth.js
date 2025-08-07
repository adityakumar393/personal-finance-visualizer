import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export function withAuth(handler) {
  return async (...args) => {
    const cookieStore = await cookies();
    const idToken = cookieStore.get("idToken")?.value;

    if (!idToken) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      return handler(decoded, ...args); // pass uid in decoded.uid
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  };
}

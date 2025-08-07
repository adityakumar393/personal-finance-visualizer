import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

/* ── create / refresh session cookie ───────── */
export async function POST(req) {
  const { token } = await req.json();
  const decoded = await adminAuth.verifyIdToken(token);

  const cookieStore = await cookies();
  cookieStore.set("idToken", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  cookieStore.set("uid", decoded.uid, { httpOnly: true, path: "/" });

  return NextResponse.json({ ok: true });
}

/* ── destroy session ───────────────────────── */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("idToken");
  cookieStore.delete("uid");
  return NextResponse.json({ ok: true });
}

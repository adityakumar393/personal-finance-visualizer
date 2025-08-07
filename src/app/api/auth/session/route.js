import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

const COOKIE_OPTS = {
  httpOnly: true,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,           // 7 days
  secure: process.env.NODE_ENV === "production",
};

export async function POST(req) {
  const { token } = await req.json();
  const decoded = await adminAuth.verifyIdToken(token);

  /* create response FIRST, then attach cookies to it */
  const res = NextResponse.json({ ok: true });

  res.cookies.set("idToken", token, COOKIE_OPTS);
  res.cookies.set("uid", decoded.uid, COOKIE_OPTS);

  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("idToken", { path: "/" });
  res.cookies.delete("uid", { path: "/" });
  return res;
}

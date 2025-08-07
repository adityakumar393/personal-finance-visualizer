// PUT → update   |   DELETE → remove
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { budgetSchema } from "@/lib/validation";
import { withAuth } from "@/lib/withAuth";

/* ── PUT ──────────────────────────────────────────────── */
export const PUT = withAuth(async (user, req, { params }) => {
  const body = await req.json();
  const parsed = budgetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });
  }

  const db = await getDb();
  const res = await db.collection("budgets").updateOne(
    { _id: new ObjectId(params.id), uid: user.uid },   // ownership check
    { $set: parsed.data }
  );

  if (res.matchedCount === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
});

/* ── DELETE ───────────────────────────────────────────── */
export const DELETE = withAuth(async (user, _req, { params }) => {
  const db = await getDb();
  const res = await db.collection("budgets").deleteOne({
    _id: new ObjectId(params.id),
    uid: user.uid,                                     // ownership check
  });

  if (res.deletedCount === 0)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ ok: true });
});

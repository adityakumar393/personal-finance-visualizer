import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { budgetSchema } from "@/lib/validation";

export async function PUT(req, { params }) {
  const body = await req.json();
  const parsed = budgetSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });

  const db = await getDb();
  await db
    .collection("budgets")
    .updateOne({ _id: new ObjectId(params.id) }, { $set: parsed.data });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req, { params }) {
  const db = await getDb();
  await db.collection("budgets").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}

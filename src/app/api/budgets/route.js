// POST  ➜ create / upsert
// GET   ➜ list budgets, filter by ?month=
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { budgetSchema } from "@/lib/validation";

export async function POST(req) {
  const body = await req.json();
  const parsed = budgetSchema.safeParse(body);
  if (!parsed.success)
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });

  const db = await getDb();
  const { month, category, amount } = parsed.data;
  // Upsert by (month, category)
  await db.collection("budgets").updateOne(
    { month, category },
    { $set: { amount } },
    { upsert: true }
  );

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET(req) {
  const url = new URL(req.url);
  const month = url.searchParams.get("month"); // optional

  const db = await getDb();
  const query = month ? { month } : {};
  const list = await db.collection("budgets").find(query).toArray();

  return NextResponse.json(list);
}

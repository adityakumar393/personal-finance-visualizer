// POST → add new  |  GET → list all
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { transactionSchema } from "@/lib/validation";

export async function POST(req) {
  const body = await req.json();
  const parsed = transactionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.issues }, { status: 400 });
  }

  const db = await getDb();
  const { insertedId } = await db.collection("transactions").insertOne(parsed.data);
  return NextResponse.json({ _id: insertedId }, { status: 201 });
}

export async function GET() {
  const db = await getDb();
  const list = await db.collection("transactions").find().sort({ date: -1 }).toArray();
  return NextResponse.json(list);
}

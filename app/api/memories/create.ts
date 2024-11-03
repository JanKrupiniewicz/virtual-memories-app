import { db } from "@/db";
import { memories, memoriesSchema } from "@/db/schema/memories";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = memoriesSchema.parse(body);

  if (!parsedBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [result] = await db
    .insert(memories)
    .values({
      title: parsedBody.title ?? "",
      description: parsedBody.description,
      latitude: parsedBody.latitude,
      longitude: parsedBody.longitude,
      category: parsedBody.category,
      isPublic: parsedBody.isPublic,
    })
    .returning({ inserted: memories.id });

  if (!result) {
    return NextResponse.json(
      { error: "Failed to insert memory" },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: result.inserted }, { status: 201 });
}

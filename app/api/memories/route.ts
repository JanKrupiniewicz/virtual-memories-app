import { db } from "@/db";
import { memories, createMemoriesSchema } from "@/db/schema/memories";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const parsedBody = createMemoriesSchema.parse(body);

  if (!parsedBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const [result] = await db
    .insert(memories)
    .values({
      userId: parsedBody.userId,
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

export async function GET(_: Request): Promise<Response> {
  const result = await db.query.memories.findMany();
  return NextResponse.json(result);
}

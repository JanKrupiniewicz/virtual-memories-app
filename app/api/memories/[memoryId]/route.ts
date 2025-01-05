import { db } from "@/db";
import { memories } from "@/db/schema";
import { createMemoriesSchema } from "@/db/schema/memories";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ memoryId: string }> }
): Promise<Response> {
  const id = parseInt((await params).memoryId);

  if (!id) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await db.query.memories.findFirst({
    where: eq(memories.id, id),
  });

  return NextResponse.json(result);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ memoryId: string }> }
): Promise<Response> {
  const body = await req.json();
  const validatedBody = createMemoriesSchema.parse(body);

  if (!validatedBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const id = parseInt((await params).memoryId);

  if (!id) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await db
    .update(memories)
    .set({
      title: validatedBody.title,
      description: validatedBody.description,
      photoUrl: validatedBody.photoUrl,
      latitude: validatedBody.latitude,
      longitude: validatedBody.longitude,
      category: validatedBody.category,
      isPublic: validatedBody.isPublic,
    })
    .where(eq(memories.id, id));

  return NextResponse.json(result);
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ memoryId: string }> }
): Promise<Response> {
  const id = parseInt((await params).memoryId);

  if (!id) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await db.delete(memories).where(eq(memories.id, id));
  return NextResponse.json(result);
}

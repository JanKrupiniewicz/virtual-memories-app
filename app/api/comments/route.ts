import { db } from "@/db";
import { comments } from "@/db/schema";
import { commentsSchema } from "@/db/schema/comments";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ commentId: string }> }
): Promise<Response> {
  const id = parseInt((await params).commentId);

  if (!id) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await db.query.comments.findFirst({
    where: eq(comments.id, id),
  });

  return NextResponse.json(result);
}

export async function POST(req: Request): Promise<Response> {
  const body = await req.json();
  const validatedBody = commentsSchema.parse(body);

  const [result] = await db
    .insert(comments)
    .values({
      memoryId: validatedBody.memoryId as string,
      userId: validatedBody.userId as string,
      description: validatedBody.description as string,
    })
    .returning({ inserted: comments.id });

  if (!result) {
    return NextResponse.json(
      { error: "Failed to insert memory" },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: result.inserted }, { status: 201 });
}

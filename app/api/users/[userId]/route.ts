import { db } from "@/db";
import { comments, memories, users } from "@/db/schema";
import { updateUserSchema } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  const id = parseInt((await params).userId);

  if (!id) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const deleteUserResult = await db.delete(users).where(eq(users.id, id));

  if (!deleteUserResult) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }

  const deleteUserMemoriesResult = await db
    .delete(memories)
    .where(eq(memories.userId, id));

  if (!deleteUserMemoriesResult) {
    return NextResponse.json(
      { error: "Failed to delete user memories" },
      { status: 500 }
    );
  }

  const deleteUserCommentsResult = await db
    .delete(comments)
    .where(eq(users.id, id));

  if (!deleteUserCommentsResult) {
    return NextResponse.json(
      { error: "Failed to delete user comments" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "User has been deleted" });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  const id = parseInt((await params).userId);

  const body = await req.json();
  const parsedBody = updateUserSchema.parse(body);

  if (!id || !parsedBody) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const result = await db
    .update(users)
    .set({
      username: body.username,
      email: body.email,
      password: body.password,
      userRole: body.userRole,
    })
    .where(eq(users.id, id));

  if (!result) {
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "User has been updated" },
    { status: 200 }
  );
}

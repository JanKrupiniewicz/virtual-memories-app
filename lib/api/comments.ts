import { db } from "@/db";
import { comments, users } from "@/db/schema";
import { CommentsSchema } from "@/db/schema/comments";
import { eq } from "drizzle-orm";

export async function getCommentsForMemory(memoryId: string) {
  const memoryComments = await db
    .select()
    .from(comments)
    .leftJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.memoryId, memoryId))
    .orderBy(comments.createdAt);

  return memoryComments;
}

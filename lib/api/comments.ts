import { db } from "@/db";
import { comments, users } from "@/db/schema";
import { CommentsSchema } from "@/db/schema/comments";
import { eq } from "drizzle-orm";

export async function getCommentsForMemory(memoryId: string) {
  const memoryComments = await db
    .select()
    .from(comments)
    .where(eq(comments.memoryId, memoryId))
    .execute();

  return memoryComments;
}

export async function getUsernamesForComments(comments: CommentsSchema[]) {
  const usernames: string[] = [];

  comments.forEach(async (comment) => {
    const user = await db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.id, parseInt(comment.userId)))
      .execute();

    usernames.push(user[0].username);
  });

  return usernames;
}

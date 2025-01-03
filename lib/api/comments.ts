import { db } from "@/db";
import { comments } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getCommentsForMemory(memoryId: string) {
  const memoryIdNumber = parseInt(memoryId);

  const memoryComments = await db
    .select()
    .from(comments)
    .where(eq(comments.memoryId, memoryIdNumber))
    .execute();

  return memoryComments;
}

import { db } from "@/db";
import { memories, users } from "@/db/schema";
import { count, eq } from "drizzle-orm";

export async function getNumberOfMemoriesPerCategory() {
  return await db
    .select({ count: count(), category: memories.category })
    .from(memories)
    .groupBy(memories.category);
}

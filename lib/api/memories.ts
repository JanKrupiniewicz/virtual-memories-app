import { db } from "@/db";
import { redirect } from "next/navigation";
import { getCurrentSession } from "../auth/auth";
import { memories, photos } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { photosSchema } from "@/db/schema/photos";

export async function getMemoriesForUser() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }

  const usersMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.userId, session.session?.userId ?? -1))
    .execute();

  return usersMemories;
}

export async function getMemoryById(memoryId: string) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }

  const memoryIdNumber = parseInt(memoryId);

  const memory = await db
    .select()
    .from(memories)
    .where(
      and(
        eq(memories.userId, session.session?.userId ?? -1),
        eq(memories.id, memoryIdNumber)
      )
    )
    .limit(1)
    .execute();

  return memory;
}

export async function saveMemoryPhoto({
  memoryId,
  photoUrl,
  description,
}: {
  memoryId: number;
  photoUrl: string;
  description?: string;
}) {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }

  const parsedBody = photosSchema.parse({
    memoryId: memoryId,
    url: photoUrl,
    description: description ?? "",
  });

  const result = await db.insert(photos).values(parsedBody).execute();

  return result;
}

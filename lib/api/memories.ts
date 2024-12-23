import { db } from "@/db";
import { redirect } from "next/navigation";
import { getCurrentSession } from "../auth/auth";
import { memories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

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
    .where(eq(memories.id, memoryIdNumber))
    .limit(1)
    .execute();

  return memory;
}

export async function getMemories() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/");
  }

  const memories = await db.query.memories.findMany();
  return memories;
}

export async function getPublicMemories() {
  const memories = await db.query.memories.findMany({
    where: (memories, { eq }) => eq(memories.isPublic, true),
  });
  return memories;
}

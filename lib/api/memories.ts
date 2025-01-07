import "server-only";

import { db } from "@/db";
import { redirect } from "next/navigation";
import { getCurrentSession } from "../auth/auth";
import { memories } from "@/db/schema";
import { eq, and, asc } from "drizzle-orm";

export async function getMemories() {
  const allMemories = await db
    .select()
    .from(memories)
    .orderBy(asc(memories.createdAt));
  return allMemories;
}

export async function getMemoriesForUser() {
  const session = await getCurrentSession();

  const usersMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.userId, session.session?.userId ?? -1))
    .orderBy(asc(memories.createdAt));

  return usersMemories;
}

export async function getMemoryById(memoryId: string) {
  const memoryIdNumber = parseInt(memoryId);

  const memory = await db
    .select()
    .from(memories)
    .where(and(eq(memories.id, memoryIdNumber)))
    .limit(1);

  return memory;
}

export async function saveMemoryPhoto({
  memoryId,
  photoUrl,
}: {
  memoryId: string;
  photoUrl: string;
}) {
  const session = await getCurrentSession();

  const memoryIdNumber = parseInt(memoryId);
  const result = await db
    .update(memories)
    .set({ photoUrl })
    .where(
      and(
        eq(memories.userId, session.session?.userId ?? -1),
        eq(memories.id, memoryIdNumber)
      )
    )
    .returning({
      id: memories.id,
    });

  if (result.length === 0) {
    return false;
  }

  return true;
}

export async function getPublicMemories() {
  const publicMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.isPublic, true))
    .orderBy(asc(memories.createdAt));

  return publicMemories;
}

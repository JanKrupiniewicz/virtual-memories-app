import { db } from "@/db";
import { redirect } from "next/navigation";
import { getCurrentSession } from "../auth/auth";
import { memories } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function getMemoriesForUser() {
  const session = await getCurrentSession();
  if (!session) {
    redirect("/auth/login");
  }

  const usersMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.userId, session.session?.userId ?? -1))
    .execute();

  return usersMemories;
}

export async function getPublicMemoriesForUser() {
  const session = await getCurrentSession();

  const usersMemories = await db
    .select()
    .from(memories)
    .where(
      and(
        eq(memories.isPublic, true),
        eq(memories.userId, session.session?.userId ?? -1)
      )
    )
    .execute();

  return usersMemories;
}

export async function getPublicMemories() {
  const usersMemories = await db
    .select()
    .from(memories)
    .where(eq(memories.isPublic, true))
    .execute();

  return usersMemories;
}

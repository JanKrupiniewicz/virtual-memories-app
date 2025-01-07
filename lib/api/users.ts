import "server-only";

import { db } from "@/db";
import { getCurrentSession } from "../auth/auth";
import { asc, eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { redirect } from "next/navigation";

export async function getUsers() {
  const allUsers = await db.select().from(users).orderBy(asc(users.id));
  return allUsers;
}

export async function getUserById(id: string) {
  const userId = parseInt(id);
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
  return user;
}

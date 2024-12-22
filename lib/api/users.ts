import { db } from "@/db";
import { getCurrentSession } from "../auth/auth";
import { eq } from "drizzle-orm";

export async function getUsers() {
  const session = getCurrentSession();
  if (!session) {
    return [];
  }
  const users = await db.query.users.findMany();
  return users;
}

export async function getUserById(id: string) {
  const userId = parseInt(id);
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
  });
  return user;
}

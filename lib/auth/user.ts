"use server";

import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { signInUserSchema } from "@/db/schema/users";

export async function validateUser(email: string, password: string) {
  const { email: validatedEmail, password: validatedPassword } =
    signInUserSchema.parse({
      email,
      password,
    });

  const usersFound = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, validatedEmail),
        eq(users.password, validatedPassword)
      )
    )
    .execute();

  const user = usersFound[0];

  if (!user) return null;

  return {
    id: user.id.toString(),
    name: user.username,
    email: user.email,
  };
}

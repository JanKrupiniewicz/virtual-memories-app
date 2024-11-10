import { signInUserSchema, users } from "@/db/schema/users";
import { and, eq } from "drizzle-orm";
import {
  generateSessionToken,
  createSession,
  setSessionTokenCookie,
} from "@/lib/auth/auth";
import { db } from "@/db";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = signInUserSchema.parse(body);

  if (!parsedBody) {
    return new Response("Invalid input", { status: 400 });
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(
      and(
        eq(users.email, parsedBody.email),
        eq(users.password, parsedBody.password)
      )
    )
    .execute();

  if (!existingUser) {
    return new Response("Invalid credentials", { status: 401 });
  }

  const token = generateSessionToken();
  const session = await createSession(token, existingUser.id);
  setSessionTokenCookie(token, session.expiresAt);

  await cookies();
  return new Response(null, { status: 200 });
}

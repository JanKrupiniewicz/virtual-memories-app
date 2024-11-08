import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { SignUpUserSchema, users } from "@/db/schema/users";
import { Session, session } from "@/db/schema/session";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const newSession: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insert(session).values(newSession);
  return newSession;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await db
    .select({ user: users, userSession: session })
    .from(session)
    .innerJoin(users, eq(session.userId, users.id))
    .where(eq(session.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, userSession } = result[0];
  if (Date.now() >= userSession.expiresAt.getTime()) {
    await db.delete(session).where(eq(session.id, userSession.id));
    return { session: null, user: null };
  }
  if (
    Date.now() >=
    userSession.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15
  ) {
    userSession.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(session)
      .set({
        expiresAt: userSession.expiresAt,
      })
      .where(eq(session.id, userSession.id));
  }
  return { user, userSession };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  // TODO
}

export type SessionValidationResult =
  | { session: Session; user: SignUpUserSchema }
  | { session: null; user: null };
function sha256(arg0: Uint8Array): Uint8Array {
  throw new Error("Function not implemented.");
}

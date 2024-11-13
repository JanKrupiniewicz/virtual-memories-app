import {
  deleteSessionTokenCookie,
  getCurrentSession,
  invalidateSession,
} from "@/lib/auth/auth";

export async function POST() {
  const session = await getCurrentSession();

  if (session.session) {
    await invalidateSession(session.session?.id);
    await deleteSessionTokenCookie();
    return new Response(null, { status: 200 });
  }

  return new Response(null, { status: 400 });
}

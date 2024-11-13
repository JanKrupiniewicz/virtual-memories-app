import { getCurrentSession } from "@/lib/auth/auth";

export async function GET() {
  const sessionResult = await getCurrentSession();

  if (!sessionResult.session) {
    return new Response(null, { status: 401 });
  }

  return new Response(JSON.stringify(sessionResult), { status: 200 });
}

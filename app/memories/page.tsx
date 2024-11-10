import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function MemoriesPage() {
  const session = await getCurrentSession();

  if (!session.session || !session.user) return redirect("/");

  return (
    <div>
      <h1>Memories</h1>
      <p>Logged in users only</p>
    </div>
  );
}

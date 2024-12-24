import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getMemoriesForUser } from "@/lib/api/memories";
import MemoriesMap from "@/components/memories-map";

export default async function MemoryMapPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
    redirect("/");
  }

  const usersMemories = await getMemoriesForUser();

  return (
    <div className="container mx-auto my-20 py-8">
      <h1 className="text-3xl text-center tracking-tight italic font-bold mb-6">
        Twoje wspomienia na mapie
      </h1>
      <MemoriesMap memories={usersMemories} />
    </div>
  );
}

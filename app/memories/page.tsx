import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { getMemoriesForUser } from "@/lib/api/memories";
import MemoryCard from "@/components/memory-card";

export default async function MemoriesPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
    redirect("/");
  }

  const usersMemories = await getMemoriesForUser();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-center tracking-tight italic font-bold mb-6">
        Twoje wspomienia
      </h1>
      {usersMemories.length === 0 ? (
        <div className="text-center text-xl tracking-tight">Brak wspomnień</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {usersMemories.map((memory) => (
            <MemoryCard key={memory.id} memory={memory} />
          ))}
        </div>
      )}
    </div>
  );
}

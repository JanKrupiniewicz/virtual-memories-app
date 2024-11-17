import SingleMemoryCard from "@/components/single-memory-card";
import { getMemoryById } from "@/lib/api/memories";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function MemoryPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const session = await getCurrentSession();

  if (session.session === null || session.session === null) {
    redirect("/");
  }

  const memoryId = (await params).memoryId;
  const memory = await getMemoryById(memoryId);

  if (memory.length === 0) {
    redirect("/memories");
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <SingleMemoryCard memory={memory[0]} />
    </div>
  );
}

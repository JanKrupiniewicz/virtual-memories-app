import CommentsCard from "@/components/comments-card";
import DetailedMemoryCard from "@/components/detailed-memory-card";
import { getCommentsForMemory } from "@/lib/api/comments";
import { getMemoryById } from "@/lib/api/memories";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function MemoryPage({
  params,
}: {
  params: Promise<{ memoryId: string }>;
}) {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
    redirect("/");
  }

  const memoryId = (await params).memoryId;
  const memory = await getMemoryById(memoryId);
  const comments = await getCommentsForMemory(memoryId);

  if (
    memory.length === 0 ||
    (memory[0].userId !== session.session.userId &&
      session.user.userRole !== "admin")
  ) {
    redirect("/memories");
  }

  return (
    <div className="py-8 px-4 md:px-0 max-w-2xl mx-auto space-y-10">
      <DetailedMemoryCard memory={memory[0]} />
      <CommentsCard comments={comments} />
    </div>
  );
}

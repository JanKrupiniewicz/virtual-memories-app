import CommentsCard from "@/components/comments-card";
import DetailedPublicMemoryCard from "@/components/detailed-public-memory-card";
import { getCommentsForMemory } from "@/lib/api/comments";
import { getMemoryById } from "@/lib/api/memories";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function PublicMemoryPage({
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

  console.log(memory);
  console.log(comments);

  return (
    <div className="py-8 px-4 md:px-0 max-w-2xl mx-auto space-y-10">
      <DetailedPublicMemoryCard memory={memory[0]} />
      <CommentsCard
        comments={comments}
        memoryId={memory[0].id}
        user={{
          id: session.session.userId,
          username: session.user.username,
          email: session.user.email,
          password: session.user.password,
          userRole: session.user.userRole,
        }}
      />
    </div>
  );
}

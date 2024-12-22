import UpdateMemoryForm from "@/components/forms/update-memory";
import { getMemoryById } from "@/lib/api/memories";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function UpdateMemoryPage({
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

  if (memory.length === 0) {
    redirect("/memories");
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="p-2 shadow-lg w-full max-w-xl">
        <h2 className="text-3xl text-center tracking-tight italic font-bold mb-6">
          Edytuj wspomnienie
        </h2>
        <UpdateMemoryForm memory={memory[0]} />
      </div>
    </div>
  );
}

import CreateMemoryForm from "@/components/forms/create-memory";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function NewMemoryPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="p-2 shadow-lg w-full rounded-lg max-w-xl">
        <h2 className="text-3xl text-center tracking-tight italic font-bold mb-6">
          Utwórz nowe wspomnienie
        </h2>
        <CreateMemoryForm />
      </div>
    </div>
  );
}

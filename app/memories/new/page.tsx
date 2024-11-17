import CreateMemoryForm from "@/components/create-memory-form";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function NewMemoryPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.session === null) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="p-2 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl text-center tracking-tight italic font-bold mb-6">
          Utwórz nowe wspomnienie
        </h2>
        <CreateMemoryForm />
      </div>
    </div>
  );
}

import RegisterForm from "@/components/forms/register";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await getCurrentSession();

  if (session.session !== null || session.user !== null) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>
        <RegisterForm />
      </div>
    </div>
  );
}

import LoginForm from "@/components/forms/login";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getCurrentSession();

  if (session.session !== null || session.user !== null) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center py-24">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
        <LoginForm />
      </div>
    </div>
  );
}

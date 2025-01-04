import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();
  if (session.user === null || session.user.userRole !== "admin") {
    redirect("/");
  }

  return <div className="container mx-auto py-8">{children}</div>;
}

<<<<<<< HEAD
import CreateMemoryForm from "@/components/create-memory-form";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function NewMemoryPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
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
=======
import CreateMemoryForm from "@/components/forms/create-memory";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default async function NewMemoryPage() {
  const session = await getCurrentSession();

  if (session.session === null || session.user === null) {
    redirect("/");
  }

  return (
    <Card className="w-3/4 my-5 mx-auto">
      <CardHeader>
        <h2 className="text-3xl text-center tracking-tight italic font-bold mb-6">
          Utwórz nowe wspomnienie
        </h2>
      </CardHeader>
      <CardContent>
        <CreateMemoryForm />
      </CardContent>
      <CardFooter className="p-4 pt-0 text-xs text-muted-foreground">
        <div className="flex flex-row w-full justify-between">
          <CardDescription>
            Wszystkie wspomnienia są prywatne, chyba że zdecydujesz inaczej.
          </CardDescription>
        </div>
      </CardFooter>
    </Card>
  );
}
>>>>>>> main

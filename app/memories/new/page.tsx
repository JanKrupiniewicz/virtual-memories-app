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

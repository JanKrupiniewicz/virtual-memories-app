import UpdateMemoryForm from "@/components/forms/update-memory";
import { getMemoryById } from "@/lib/api/memories";
import { getCurrentSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

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

  if (
    memory.length === 0 ||
    (memory[0].userId !== session.session.userId &&
      session.user.userRole !== "admin")
  ) {
    redirect("/memories");
  }

  return (
    <Card className="w-3/4 my-5 mx-auto">
      <CardHeader>
        <h2 className="text-3xl text-center tracking-tight italic font-bold mb-6">
          Edytuj wspomnienie
        </h2>
      </CardHeader>
      <CardContent>
        <UpdateMemoryForm memory={memory[0]} />
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

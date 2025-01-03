import { CommentsSchema } from "@/db/schema/comments";
import { getUserById } from "@/lib/api/users";
import { Separator } from "@/components/ui/separator";
import { UserCircle } from "lucide-react";

export default async function Comment({
  comment,
}: {
  comment: CommentsSchema;
}) {
  const user = comment.userId ? await getUserById(comment.userId) : null;

  return (
    <>
      <div className="flex items-center gap-4">
        <UserCircle className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">
            {user?.username || "Anonimowy"}
          </span>
          <span className="text-sm">{comment.description}</span>
        </div>
      </div>
      <Separator className="my-2" />
    </>
  );
}

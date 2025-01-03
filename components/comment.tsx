import { CommentsSchema } from "@/db/schema/comments";
import { getUserById } from "@/lib/api/users";
import { Separator } from "@/components/ui/separator";
import { UserCircle } from "lucide-react";

export default async function Comment({
  comment,
  username,
}: {
  comment: CommentsSchema;
  username: string;
}) {
  return (
    <>
      <div className="flex flex-col items-start m-4 gap-2">
        <span className="text-sm font-semibold">{username || "Anonimowy"}</span>
        <span className="text-sm">{comment.description}</span>
      </div>
      <Separator className="my-2" />
    </>
  );
}

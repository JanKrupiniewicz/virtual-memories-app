import { Separator } from "@/components/ui/separator";
import { UserCircle } from "lucide-react";
import { CommentsWithUsers } from "@/components/comments-card";

export default function Comment({ comment }: { comment: CommentsWithUsers }) {
  return (
    <>
      <div className="flex flex-col items-start m-4 gap-2">
        <div className="flex items-center gap-2">
          <UserCircle size={16} />
          <span className="text-sm font-semibold">
            {comment.users?.username || "Anonimowy"}
          </span>
        </div>
        <span className="text-sm">{comment.comments.description}</span>
        <span className="text-xs">
          {comment.users?.email || "brak adresu email"}
        </span>
      </div>
      <Separator className="my-2" />
    </>
  );
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentsSchema } from "@/db/schema/comments";
import Comment from "./comment";

export default function CommentsCard({
  comments,
}: {
  comments: CommentsSchema[];
}) {
  return (
    <ScrollArea className="h-96 rounded-xl shadow border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium tracking-tight">Komentarze</h4>
        {comments.map((comment: CommentsSchema) => Comment({ comment }))}
      </div>
    </ScrollArea>
  );
}

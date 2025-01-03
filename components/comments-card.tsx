"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentsSchema } from "@/db/schema/comments";
import Comment from "./comment";
import CreateCommentForm from "./forms/create-comment";
import { useState } from "react";
import { SessionValidationResult } from "@/lib/auth/auth";

export default function CommentsCard({
  comments,
  usernames,
  memoryId,
  userId,
}: {
  comments: CommentsSchema[];
  usernames: string[];
  memoryId: number;
  userId: number;
}) {
  const [currentComments, setCurrentComments] =
    useState<CommentsSchema[]>(comments);

  return (
    <div className="flex flex-col gap-4">
      <CreateCommentForm
        memoryId={memoryId}
        userId={userId ?? 0}
        setCurrentComments={setCurrentComments}
      />
      <ScrollArea className="h-72">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium tracking-tight">
            Komentarze
          </h4>
          {currentComments.map((comment: CommentsSchema, itr) =>
            Comment({ comment, username: usernames[itr] })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

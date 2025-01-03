"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CommentsSchema } from "@/db/schema/comments";
import Comment from "./comment";
import CreateCommentForm from "./forms/create-comment";
import { useState } from "react";
import { UpdateUserSchema } from "@/db/schema/users";

export interface CommentsWithUsers {
  users: {
    id: number;
    username: string;
    email: string;
    password: string;
    userRole: string;
  } | null;
  comments: {
    id: number;
    description: string;
    userId: string;
    createdAt: string;
    memoryId: string;
  };
}

export default function CommentsCard({
  comments,
  memoryId,
  user,
}: {
  comments: CommentsWithUsers[];
  memoryId: number;
  user: UpdateUserSchema;
}) {
  const [currentComments, setCurrentComments] =
    useState<CommentsWithUsers[]>(comments);

  return (
    <div className="flex flex-col gap-4">
      <CreateCommentForm
        memoryId={memoryId}
        user={user ?? null}
        setCurrentComments={setCurrentComments}
      />
      <ScrollArea className="h-72">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium tracking-tight">
            Komentarze
          </h4>
          {currentComments.map((comment: CommentsWithUsers) =>
            Comment({ comment })
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

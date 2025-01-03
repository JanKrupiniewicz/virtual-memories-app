"use client";

import { commentsSchema, CommentsSchema } from "@/db/schema/comments";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";

export default function CreateCommentForm({
  memoryId,
  userId,
  setCurrentComments,
}: {
  memoryId: number;
  userId: number;
  setCurrentComments: Dispatch<SetStateAction<CommentsSchema[]>>;
}) {
  console.log(memoryId, userId, setCurrentComments);

  const form = useForm<z.infer<typeof commentsSchema>>({
    resolver: zodResolver(commentsSchema),
    defaultValues: {
      userId: "",
      memoryId: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentsSchema>) {
    const response = await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Nie udało się dodać komentarza.");
      return;
    }

    const newComment = await response.json();
    setCurrentComments((prevComments) => [...prevComments, newComment]);

    toast.success("Komentarz został dodany pomyślnie.");
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Napisz swój komentarz ..."
                  required
                  className="w-full resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-5">
          <Button type="submit" className="w-full">
            Dodaj komentarz
          </Button>
        </div>
      </form>
    </Form>
  );
}

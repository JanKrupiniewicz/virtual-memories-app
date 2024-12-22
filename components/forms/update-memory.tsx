"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  categories,
  createMemoriesSchema,
  CreateMemoriesSchema,
  UpdateMemoriesSchema,
} from "@/db/schema/memories";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateMemoryForm({
  memory,
}: {
  memory: UpdateMemoriesSchema;
}) {
  const router = useRouter();

  const form = useForm<CreateMemoriesSchema>({
    resolver: zodResolver(createMemoriesSchema),
    defaultValues: {
      ...memory,
    },
  });

  async function onSubmit(values: CreateMemoriesSchema) {
    const response = await fetch(`/api/memories/${memory.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      toast.error("Failed to update memory");
    }

    toast.success("Memory updated successfully");
    router.push("/memories");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tytuł</FormLabel>
              <FormControl>
                <Input type="text" {...field} required className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  required
                  className="w-full resize-none h-32"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Szerokość Geografincza</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wysokość Geograficzna</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value === "" ? null : parseFloat(e.target.value)
                    )
                  }
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoria</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="accent-primary"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Czy Publiczne</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <div className="flex flex-row space-x-5">
          <Link href="/memories" className="flex items-center space-x-2">
            <Button variant="ghost">
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Wróć</span>
            </Button>
          </Link>
          <Button type="submit" className="w-full">
            Edytuj wspomnienie
          </Button>
        </div>
      </form>
    </Form>
  );
}

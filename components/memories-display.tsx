"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateMemoriesSchema } from "@/db/schema/memories";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function MemoriesDisplay({
  memories,
}: {
  memories: UpdateMemoriesSchema[];
}) {
  const [currentMemories, setCurrentMemories] =
    useState<UpdateMemoriesSchema[]>(memories);

  async function deleteMemory(id: number) {
    const response = await fetch(`/api/memories/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Nie udało się usunąć wspomnienia.");
      return;
    }

    setCurrentMemories(memories.filter((memory) => memory.id !== id));
    toast.success("Wspomienie zostało usunięte.");
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentMemories.map((memory) => (
          <TableRow key={memory.id}>
            <TableCell className="font-medium">{memory.id}</TableCell>
            <TableCell>{memory.title}</TableCell>
            <TableCell>{memory.category}</TableCell>
            <TableCell>{memory.createdAt}</TableCell>
            <TableCell className="text-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href={`/memories/${memory.id}/update`}>Edytuj</Link>
              </Button>
              <Button
                onClick={() => deleteMemory(memory.id)}
                variant="destructive"
              >
                Usuń
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

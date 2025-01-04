"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdateUserSchema } from "@/db/schema/users";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import Link from "next/link";

export default function UsersDisplay({ users }: { users: UpdateUserSchema[] }) {
  const [currentUsers, setCurrentUsers] = useState<UpdateUserSchema[]>(users);

  async function deleteUser(id: number) {
    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      toast.error("Nie udało się usunąć użytkownika.");
      return;
    }

    setCurrentUsers(users.filter((user) => user.id !== id));
    toast.success("Użytkownik został usunięty.");
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>User role</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.userRole}</TableCell>
            <TableCell className="text-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href={`/admin/edit-user/${user.id}`}>Edytuj</Link>
              </Button>
              <Button onClick={() => deleteUser(user.id)} variant="destructive">
                Usuń
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

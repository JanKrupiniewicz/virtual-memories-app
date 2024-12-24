"use client";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  CirclePlus,
  MapPinCheck,
  FileSliders,
  Users,
  Map,
  MapPinned,
} from "lucide-react";
import { useEffect, useState } from "react";
import { UpdateUserSchema } from "@/db/schema/users";
import { EditUserDialog } from "./forms/edit-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LoggedInNavbar() {
  const [user, setUser] = useState<UpdateUserSchema | null>(null);

  useEffect(() => {
    async function getSessionUser() {
      const response = await fetch("/api/auth/session");
      const { session, user } = await response.json();
      setUser(user);
    }

    getSessionUser();
  }, []);

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-6 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-center">
        <div className="flex flex-row gap-4 items-center">
          {user !== null && (
            <EditUserDialog user={user} setUser={setUser}>
              <CircleUserRound />
            </EditUserDialog>
          )}
          <div>
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          {user?.userRole === "admin" ? (
            <Link href="/admin">
              <Button className="hover:scale-105">
                <FileSliders />
                Panel admina
              </Button>
            </Link>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="hover:scale-105">
                <MapPinned />
                Wspomnienia
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                {" "}
                <Link
                  href="/memories/new"
                  className="flex w-56 items-center gap-2"
                >
                  <CirclePlus />
                  Dodaj wspomnienie
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Link href="/memories" className="flex items-center gap-2">
                  <MapPinCheck />
                  Twoje wspomnienia
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link
                  href="/public-memories"
                  className="flex items-center gap-2"
                >
                  <Users />
                  Odkrywaj wspomnienia
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                {" "}
                <Link href="/memories-map" className="flex items-center gap-2">
                  <Map />
                  Mapa wspomnień
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

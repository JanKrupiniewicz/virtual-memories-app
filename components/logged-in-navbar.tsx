"use client";

import { CircleUserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CirclePlus, MapPinCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { SignUpUserSchema } from "@/db/schema/users";

export function LoggedInNavbar() {
  const [user, setUser] = useState<SignUpUserSchema | null>(null);

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
          <div>
            <CircleUserRound />
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Link href="/memories/new">
            <Button className="hover:scale-105">
              <CirclePlus />
              Dodaj wspomnienie
            </Button>
          </Link>
          <Link href="/memories">
            <Button className="hover:scale-105">
              <MapPinCheck />
              Twoje wspomnienia
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

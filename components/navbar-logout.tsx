"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function NavbarLogout() {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }

  return <Button onClick={signOut}>Wyloguj</Button>;
}

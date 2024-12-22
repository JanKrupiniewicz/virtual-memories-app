"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useContext } from "react";
import { SessionContext } from "@/store/session-context";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function Navbar() {
  const sessionCtx = useContext(SessionContext);
  const router = useRouter();

  async function signOut() {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    sessionCtx?.setSession(null);
    router.push("/");
  }

  return (
    <nav>
      <ul className="flex space-x-4">
        {sessionCtx?.session ? (
          <li>
            <Button onClick={signOut}>
              <LogOut />
              Wyloguj
            </Button>
          </li>
        ) : (
          <>
            <li>
              <Button asChild>
                <Link href="/login">Zaloguj się</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/register">Zarejestruj się</Link>
              </Button>
            </li>
          </>
        )}
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
}

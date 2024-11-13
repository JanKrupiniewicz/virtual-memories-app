"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useContext } from "react";
import { SessionContext } from "@/store/session-context";
import { useRouter } from "next/navigation";

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
          <>
            <li>
              <Link href="/memories">
                <Button>Twoje wspomnienia</Button>
              </Link>
            </li>
            <li>
              <Button onClick={signOut}>Wyloguj</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">
                <Button>Zaloguj się</Button>
              </Link>
            </li>
            <li>
              <Link href="/register">
                <Button variant="secondary">Zarejestruj się</Button>
              </Link>
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

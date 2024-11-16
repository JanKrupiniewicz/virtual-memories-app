"use client";

import Link from "next/link";
import { MapPinCheck } from "lucide-react";
import { Navbar } from "./navbar";
import { LoggedInNavbar } from "./logged-in-navbar";
import { useContext } from "react";
import { SessionContext } from "@/store/session-context";

export function Header() {
  const sessionCtx = useContext(SessionContext);

  return (
    <header>
      <div className="container mx-auto px-4 py-6 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-center">
        <Link href="/">
          <h1 className="flex items-center space-x-3 text-3xl md:text-xl hover:underline italic lg:text-3xl font-bold tracking-tight">
            <MapPinCheck className="w-8 h-8" />
            <span>Wirtualne Mapy Wspomnień</span>
          </h1>
        </Link>
        <Navbar />
      </div>
      {sessionCtx?.session ? <LoggedInNavbar /> : null}
    </header>
  );
}

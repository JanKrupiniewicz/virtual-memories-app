import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { MapPinCheck } from "lucide-react";
import { getCurrentSession } from "@/lib/auth/auth";
import { NavbarLogout } from "./navbar-logout";

export async function Navbar() {
  const { session, user } = await getCurrentSession();

  return (
    <header className="container mx-auto px-4 py-6 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-center">
      <Link href="/">
        <h1 className="flex items-center space-x-3 text-3xl md:text-xl lg:text-3xl font-bold tracking-tight">
          <MapPinCheck className="w-8 h-8" />
          <span>Wirtualne Mapy Wspomnień</span>
        </h1>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          {session !== null && user !== null ? (
            <>
              <li>
                <Link href="/memories">
                  <Button>Twoje wspomnienia</Button>
                </Link>
              </li>
              <li>
                <NavbarLogout />
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
    </header>
  );
}

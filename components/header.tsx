import Link from "next/link";
import { MapPinCheck } from "lucide-react";
import { Navbar } from "./navbar";

export async function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex flex-col space-y-8 md:space-y-0 md:flex-row justify-between items-center">
      <Link href="/">
        <h1 className="flex items-center space-x-3 text-3xl md:text-xl lg:text-3xl font-bold tracking-tight">
          <MapPinCheck className="w-8 h-8" />
          <span>Wirtualne Mapy Wspomnień</span>
        </h1>
      </Link>
      <Navbar />
    </header>
  );
}

import { ModeToggle } from "@/components/ModeToggle";

export function Navbar() {
  return (
    <header className="container mx-auto px-4 py-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Wirtualne Mapy Wspomnień</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="#features">Funkcje</a>
          </li>
          <li>
            <a href="#cta">Dołącz</a>
          </li>
          <li>
            <ModeToggle />
          </li>
        </ul>
      </nav>
    </header>
  );
}

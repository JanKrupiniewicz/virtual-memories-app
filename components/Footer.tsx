export function Footer() {
  return (
    <footer className="py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xl tracking-tight">
          &copy; 2024 Wirtualne Mapy Wspomnień. Wszelkie prawa zastrzeżone.
        </p>
        <div className="mt-4 text-sm tracking-tight">
          <a href="#" className="mx-2 hover:underline">
            Polityka prywatności
          </a>
          <a href="#" className="mx-2 hover:underline">
            Warunki użytkowania
          </a>
          <a href="#" className="mx-2 hover:underline">
            Kontakt
          </a>
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import { Globe, Lock, MapPin, Filter } from "lucide-react";
import Link from "next/link";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <div className="p-6 rounded-lg shadow-md bg-primary text-primary-foreground text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default async function Home() {
  return (
    <main>
      <section className="mx-auto bg-secondary text-secondary-foreground px-4 py-20 text-center">
        <h2 className="text-4xl italic font-bold tracking-tight md:text-5xl mb-6">
          Twórz i odkrywaj mapy wspomnień
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Podziel się swoimi historiami, zdjęciami i wspomnieniami związanymi z
          konkretnymi miejscami. Odkryj fascynujące opowieści innych
          użytkowników z całego świata.
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-primary text-primary-foreground">
            Rozpocznij podróż
          </Button>
        </Link>
      </section>

      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">
            Główne funkcje
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<MapPin className="w-12 h-12" />}
              title="Interaktywna mapa"
              description="Dodawaj piny z historiami i zdjęciami w konkretnych lokalizacjach."
            />
            <FeatureCard
              icon={<Filter className="w-12 h-12" />}
              title="Tagowanie i filtry"
              description="Kategoryzuj swoje wspomnienia i łatwo przeglądaj historie innych."
            />
            <FeatureCard
              icon={<Lock className="w-12 h-12" />}
              title="Prywatność"
              description="Decyduj, czy Twoje wspomnienia mają być prywatne czy publiczne."
            />
            <FeatureCard
              icon={<Globe className="w-12 h-12" />}
              title="Odkrywaj świat"
              description="Poznawaj fascynujące historie z różnych zakątków globu."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

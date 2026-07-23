import React from "react";
import CocktailCarousel from "./CocktailCarousel";
import MockctailCarousel from "./MocktailCarousel";
import SectionTitle from "../ui/SectionTitle";
import ClassicCarousel from "./ClasicCocktail/ClassicCarousel";
import { supabase } from "@/lib/supabase";
import cocktailsFallback from "@/data/cocktails.json";
import Image from "next/image";

const bars = [
  {
    number: "01",
    name: "Le Distingué",
    description:
      "Sobre et raffiné, idéal pour les mariages et évènements privés.",
    image:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bar Le Distingué",
  },
  {
    number: "02",
    name: "Le Speakeasy",
    description:
      "Adapté aux grandes réceptions et évènements d’entreprise.",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bar Le Speakeasy",
  },
  {
    number: "03",
    name: "Le Jungle",
    description: "Bar végétal, s’adapte à tous les environnements.",
    image:
      "https://images.unsplash.com/photo-1571167366136-b57e03b5f0c0?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Bar Le Jungle",
  },
];

async function Carousel() {
  let cocktailsList = cocktailsFallback.cocktails;
  let mocktailsList = cocktailsFallback.mocktails;
  let classiquesList = cocktailsFallback.classiques;

  try {
    const { data, error } = await supabase
      .from("cocktails")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data && data.length > 0) {
      cocktailsList = data.filter((c) => c.category === "cocktails");
      mocktailsList = data.filter((c) => c.category === "mocktails");
      classiquesList = data.filter((c) => c.category === "classiques");
    }
  } catch {
    // Supabase unavailable — using local JSON fallback
  }

  return (
    <div id="cocktails" className="bg-black py-24">
      <div className="container mx-auto px-6">

        <SectionTitle
          eyebrow="La carte"
          title="Nos créations"
          subtitle="Une sélection de cocktails élaborés avec des ingrédients frais de qualité, pensés pour s'adapter à chaque occasion et enchanter vos invités."
          className="mb-16"
        />

        <CocktailCarousel items={cocktailsList} />

        {/* Mocktails — masqué temporairement */}
        {false && (
          <div className="mt-24">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px flex-1 max-w-[60px] bg-white/15" />
              <p
                className="text-[0.6rem] tracking-[0.35em] uppercase text-white/50"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Sans alcool
              </p>
              <div className="h-px flex-1 bg-white/8" />
            </div>
            <h2
              className="text-[clamp(2rem,4vw,3.5rem)] text-white mb-4"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700, lineHeight: 0.95 }}
            >
              Mocktails
            </h2>
            <p
              className="text-sm leading-relaxed text-white/65 max-w-2xl mb-12"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Pour une expérience sans alcool qui ne sacrifie ni le goût ni l&apos;élégance,
              nos mocktails sont élaborés avec la même attention aux détails et aux saveurs raffinées.
            </p>
            <MockctailCarousel items={mocktailsList} />
          </div>
        )}

        {/* Classiques */}
        <div className="mt-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 max-w-[60px] bg-white/15" />
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase text-white/50"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Intemporels
            </p>
            <div className="h-px flex-1 bg-white/8" />
          </div>
          <h2
            className="text-[clamp(2rem,4vw,3.5rem)] text-white mb-4"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700, lineHeight: 0.95 }}
          >
            Les classiques
          </h2>
          <p
            className="text-sm leading-relaxed text-white/65 max-w-2xl mb-12"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Mojito, Margarita, Daiquiri, Old Fashioned — des incontournables revisités avec des
            ingrédients de qualité et un savoir-faire qui respecte les techniques traditionnelles.
          </p>
          <ClassicCarousel items={classiquesList} />
        </div>

        {/* Scénographie */}
        <div className="mt-32">
          <SectionTitle
            eyebrow="Nos Bars"
            title="Scénographie"
            subtitle="Chaque événement mérite un bar à son image. Trois univers, une même exigence."
            className="mb-20"
          />

          <div className="space-y-2">
            {bars.map((bar, index) => {
              const imageLeft = index % 2 === 0;
              return (
                <div
                  key={bar.number}
                  className={`flex flex-col ${imageLeft ? "lg:flex-row" : "lg:flex-row-reverse"} items-stretch min-h-[420px]`}
                >
                  {/* Image */}
                  <div className="relative w-full lg:w-3/5 min-h-[280px] lg:min-h-0 overflow-hidden">
                    <Image
                      src={bar.image}
                      alt={bar.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/25" />
                  </div>

                  {/* Text */}
                  <div className="relative w-full lg:w-2/5 bg-[#050505] border border-white/5 flex flex-col justify-center px-10 py-12 lg:px-14">
                    <p
                      className="text-[0.55rem] tracking-[0.4em] uppercase text-white/30 mb-6"
                      style={{ fontFamily: "var(--font-lato), sans-serif" }}
                    >
                      {bar.number}
                    </p>
                    <h3
                      className="text-[clamp(2rem,3.5vw,3rem)] text-white leading-none mb-5"
                      style={{
                        fontFamily:
                          "var(--font-cormorant), var(--font-playfair), Georgia, serif",
                        fontWeight: 700,
                      }}
                    >
                      {bar.name}
                    </h3>
                    <div className="w-10 h-px bg-white/20 mb-6" />
                    <p
                      className="text-white/60 text-sm leading-relaxed max-w-xs"
                      style={{
                        fontFamily: "var(--font-lato), sans-serif",
                        fontWeight: 300,
                      }}
                    >
                      {bar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Carousel;

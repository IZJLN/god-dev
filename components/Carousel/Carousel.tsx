import React from "react";
import CocktailCarousel from "./CocktailCarousel";
import MockctailCarousel from "./MocktailCarousel";
import SectionTitle from "../ui/SectionTitle";
import ClassicCarousel from "./ClasicCocktail/ClassicCarousel";
import cocktailsData from "@/data/cocktails.json";

function Carousel() {
  const cocktailsList = cocktailsData.cocktails ?? [];
  const mocktailsList = cocktailsData.mocktails ?? [];
  const classiquesList = cocktailsData.classiques ?? [];

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

        {/* Mocktails */}
        <div className="mt-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 max-w-[60px] bg-white/15" />
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase text-white/35"
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
            className="text-sm leading-relaxed text-white/40 max-w-2xl mb-12"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Pour une expérience sans alcool qui ne sacrifie ni le goût ni l&apos;élégance,
            nos mocktails sont élaborés avec la même attention aux détails et aux saveurs raffinées.
          </p>
          <MockctailCarousel items={mocktailsList} />
        </div>

        {/* Classiques */}
        <div className="mt-24">
          <div className="flex items-center gap-6 mb-12">
            <div className="h-px flex-1 max-w-[60px] bg-white/15" />
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase text-white/35"
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
            className="text-sm leading-relaxed text-white/40 max-w-2xl mb-12"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Mojito, Margarita, Daiquiri, Old Fashioned — des incontournables revisités avec des
            ingrédients de qualité et un savoir-faire qui respecte les techniques traditionnelles.
          </p>
          <ClassicCarousel items={classiquesList} />
        </div>

      </div>
    </div>
  );
}

export default Carousel;

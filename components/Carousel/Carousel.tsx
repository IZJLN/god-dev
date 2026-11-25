import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import CocktailCarousel from "./CocktailCarousel";
import SectionTitle from "../ui/SectionTitle";
import { supabase } from "@/lib/supabase";
import cocktailsFallback from "@/data/cocktails.json";

async function Carousel() {
  noStore();
  let allCocktails = [
    ...cocktailsFallback.cocktails,
    ...cocktailsFallback.classiques,
  ];

  try {
    const { data, error } = await supabase
      .from("cocktails")
      .select("*")
      .order("id", { ascending: true });

    if (!error && data && data.length > 0) {
      allCocktails = data.filter(
        (c) => c.category === "cocktails" || c.category === "classiques"
      );
    }
  } catch {
    // Supabase unavailable — using local JSON fallback
  }

  return (
    <div id="cocktails" className="bg-black py-24">
      <div className="container mx-auto px-6">

        <SectionTitle
          eyebrow="La carte"
          title="Nos cocktails"
          subtitle="Une sélection de créations maison et de grands classiques, élaborés avec des ingrédients frais de qualité pour enchanter vos invités."
          className="mb-16"
        />

        <CocktailCarousel items={allCocktails} />

      </div>
    </div>
  );
}

export default Carousel;

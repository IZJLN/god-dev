import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";
import { supabase } from "@/lib/supabase";
import img1 from "../assets/MansoryPhoto/1.jpg";
import img5 from "../assets/MansoryPhoto/5.jpg";

const CATEGORIES = [
  { slug: "mariage", label: "Mariage", fallback: img1, dynamic: false },
  { slug: "soiree-privee", label: "Soirée privée", fallback: img5, dynamic: false },
  { slug: "atelier", label: "Atelier", fallback: "https://hyxiiqqmathtjcaprxac.supabase.co/storage/v1/object/public/images/1795267537039-2yjsdbovvmt.jpg", dynamic: true },
];

async function getCategoryCovers() {
  const { data } = await supabase
    .from("realisations")
    .select("category, image")
    .not("category", "is", null)
    .order("created_at", { ascending: false });

  const covers = {};
  for (const item of data ?? []) {
    if (item.category && item.image && !covers[item.category]) {
      covers[item.category] = item.image;
    }
  }
  return covers;
}

export default async function Services() {
  const covers = await getCategoryCovers();

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Nos Services"
          subtitle="Des rassemblements intimistes aux grandes célébrations, nous apportons l'art de la mixologie directement sur votre lieu d'événement."
          className="mb-16"
        />

        <div className="grid md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <ServiceCard
              key={cat.slug}
              slug={cat.slug}
              label={cat.label}
              cover={covers[cat.slug]}
              fallback={cat.fallback}
              dynamic={cat.dynamic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ slug, label, cover, fallback, dynamic }) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative overflow-hidden h-[380px] bg-[#0a0a0a] block"
    >
      <Image
        fill
        src={cover || fallback}
        alt={label}
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-45"
        unoptimized={!!(cover || dynamic)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Default state */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-3">
          <h3
            className="text-3xl text-white"
            style={{
              fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {label}
          </h3>
        </div>

        {/* Hover state */}
        <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <h3
            className="text-3xl text-white mb-3"
            style={{
              fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {label}
          </h3>
          <div className="flex items-center gap-3">
            <span
              className="text-[0.6rem] tracking-[0.25em] uppercase text-white/65"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Voir les réalisations
            </span>
            <div className="flex-1 h-px bg-white/15 max-w-[60px]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

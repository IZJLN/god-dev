import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";
import imgMariage from "../assets/services/mariage.jpg";
import imgAtelier from "../assets/services/atelier.jpg";
import imgSoiree from "../assets/services/soiree-privee.jpg";

const CATEGORIES = [
  { slug: "mariage",       label: "Mariages",        image: imgMariage },
  { slug: "atelier",       label: "Ateliers",        image: imgAtelier },
  { slug: "soiree-privee", label: "Soirées privées", image: imgSoiree  },
];

export default function Services() {
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
            <ServiceCard key={cat.slug} slug={cat.slug} label={cat.label} image={cat.image} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ slug, label, image }) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group relative overflow-hidden h-[380px] bg-[#0a0a0a] block"
    >
      <Image
        fill
        src={image}
        alt={label}
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-45"
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

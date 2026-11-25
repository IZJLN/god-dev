import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";
import { supabase } from "@/lib/supabase";

async function getAllRealisations() {
  const { data } = await supabase
    .from("realisations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}

const EVENT_TYPES = [
  "Mariage",
  "Événement privé",
  "Baptême",
  "EVG / EVJF",
  "Afterwork",
  "Soirée entre amis",
];

export default async function Services() {
  const reals = await getAllRealisations();

  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Nos prestations"
          title="Nos Réalisations"
          subtitle="Des rassemblements intimistes aux grandes célébrations, nous apportons l'art de la mixologie directement sur votre lieu d'événement."
          className="mb-16"
        />

        {reals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reals.map((real) => (
              <RealisationCard key={real.id} event={real} />
            ))}
          </div>
        ) : (
          <div className="border border-white/8 p-16 text-center">
            <p
              className="text-white/30 text-sm"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Les réalisations seront bientôt disponibles.
            </p>
          </div>
        )}

        {/* Accroche événements */}
        <div className="mt-14 border-t border-white/8 pt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5">
            {EVENT_TYPES.map((type, i) => (
              <React.Fragment key={type}>
                {i > 0 && (
                  <span className="text-[#C9A96E]/30 text-xs" aria-hidden>
                    —
                  </span>
                )}
                <span
                  className="text-[0.6rem] tracking-[0.22em] uppercase text-white/50"
                  style={{ fontFamily: "var(--font-lato), sans-serif" }}
                >
                  {type}
                </span>
              </React.Fragment>
            ))}
          </div>
          <p
            className="text-sm leading-relaxed text-white/45 max-w-xl"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Chaque prestation est pensée sur-mesure. Un devis personnalisé vous
            sera proposé pour garantir des services à la hauteur de vos attentes.
          </p>
        </div>
      </div>
    </section>
  );
}

function RealisationCard({ event }) {
  const isLink = event.path && event.path !== "#";
  const Wrapper = isLink ? Link : "div";

  return (
    <Wrapper
      href={isLink ? event.path : undefined}
      className="group relative overflow-hidden h-[380px] bg-[#0a0a0a] block"
    >
      <Image
        fill
        src={event.image}
        alt={event.title}
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-45"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Default */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-3">
          {event.subtitle && (
            <p
              className="text-[#C9A96E]/70 text-[0.6rem] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              {event.subtitle}
            </p>
          )}
          <h3
            className="text-3xl text-white"
            style={{
              fontFamily:
                "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {event.title}
          </h3>
        </div>

        {/* Hover */}
        <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {event.subtitle && (
            <p
              className="text-[#C9A96E]/80 text-xs tracking-wide mb-2"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              {event.subtitle}
            </p>
          )}
          <h3
            className="text-3xl text-white mb-3"
            style={{
              fontFamily:
                "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {event.title}
          </h3>
          <p
            className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-5"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            {event.description}
          </p>
          {isLink && (
            <div className="flex items-center gap-3">
              <span
                className="text-[0.6rem] tracking-[0.25em] uppercase text-white/65"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Voir le détail
              </span>
              <div className="flex-1 h-px bg-white/15 max-w-[60px]" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

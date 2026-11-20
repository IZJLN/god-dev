import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";
import { supabase } from "@/lib/supabase";

async function getRealisations() {
  const { data } = await supabase
    .from("realisations")
    .select("*")
    .order("id", { ascending: true });
  return data ?? [];
}

export default async function Events() {
  const events = await getRealisations();

  return (
    <section id="realisation" className="py-24 bg-[#050505] relative">
      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="Portfolio"
          title="Nos Réalisations"
          subtitle="Découvrez nos dernières prestations et laissez-vous inspirer par l'ambiance unique que nous avons créée pour chaque événement."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event }) {
  const isLink = event.path && event.path !== "#";
  const Wrapper = isLink ? Link : "div";

  return (
    <Wrapper
      href={isLink ? event.path : undefined}
      className="group block bg-[#0A0A0A] overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          fill
          src={event.image}
          alt={event.title}
          className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-75"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 border border-t-0 border-white/5">
        <h3
          className="text-xl text-white mb-3 group-hover:text-white/80 transition-colors duration-300"
          style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
        >
          {event.title}
        </h3>

        <div className="flex items-center gap-4 mb-3 text-xs text-white/55">
          <span className="flex items-center gap-1.5">
            <Calendar size={11} className="text-white/45" />
            {event.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={11} className="text-white/45" />
            {event.location}
          </span>
        </div>

        {/* Description tronquée avec fondu */}
        <div className="relative mb-5 h-[4.5rem] overflow-hidden">
          <p
            className="text-white/65 text-sm leading-relaxed"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            {event.description}
          </p>
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
        </div>

        {/* Bottom */}
        {isLink && (
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <span
              className="text-[0.6rem] tracking-[0.25em] uppercase text-white/55"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Voir le détail
            </span>
            <div className="flex-1 h-px bg-white/10 max-w-[50px]" />
            <ArrowRight
              size={13}
              className="text-white/55 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300"
            />
          </div>
        )}
      </div>
    </Wrapper>
  );
}

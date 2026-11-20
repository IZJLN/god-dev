import React from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";
import { supabase } from "@/lib/supabase";

async function getLastRealisation() {
  const { data } = await supabase
    .from("realisations")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();
  return data;
}

export default async function Events() {
  const event = await getLastRealisation();
  if (!event) return null;

  const isLink = event.path && event.path !== "#";
  const Wrapper = isLink ? Link : "div";

  return (
    <section id="realisation" className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Dernière réalisation"
          title="Nos Derniers Événements"
          subtitle="Découvrez notre dernière prestation et laissez-vous inspirer par l'ambiance unique que nous avons créée."
          className="mb-16"
        />

        <Wrapper
          href={isLink ? event.path : undefined}
          className="group block"
        >
          <div className="flex flex-col lg:flex-row min-h-[420px]">
            {/* Image */}
            <div className="relative w-full lg:w-3/5 h-72 lg:h-auto overflow-hidden">
              <Image
                fill
                src={event.image}
                alt={event.title}
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#050505] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent lg:hidden" />
            </div>

            {/* Text */}
            <div className="w-full lg:w-2/5 bg-[#0A0A0A] border border-white/5 p-10 lg:p-14 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-white/40">
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} className="text-[#C9A96E]/60" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={11} className="text-[#C9A96E]/60" />
                  {event.location}
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
              >
                {event.title}
              </h2>

              {event.subtitle && (
                <p
                  className="text-[#C9A96E]/80 text-sm mb-5 tracking-wide"
                  style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                >
                  {event.subtitle}
                </p>
              )}

              {/* Description with gradient fade */}
              <div className="relative mb-8">
                <p
                  className="text-white/55 text-sm leading-relaxed line-clamp-4"
                  style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                >
                  {event.description}
                </p>
              </div>

              {isLink && (
                <div className="flex items-center gap-3">
                  <span
                    className="text-[0.6rem] tracking-[0.25em] uppercase text-white/55"
                    style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  >
                    Voir le détail
                  </span>
                  <div className="flex-1 h-px bg-white/15 max-w-[50px]" />
                  <ArrowRight
                    size={13}
                    className="text-white/55 group-hover:text-white/80 group-hover:translate-x-1 transition-all duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </section>
  );
}

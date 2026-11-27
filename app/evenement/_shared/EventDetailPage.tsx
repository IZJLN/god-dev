import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, ChevronLeft, ArrowRight } from "lucide-react";
import Footer2 from "@/components/Footer2";
import SectionTitle from "@/components/ui/SectionTitle";
import StoryVideoPlayer from "@/components/StoryVideoPlayer";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EventContent {
  hero: {
    image: string;
    title: string;
    titleAccent: string;
    subtitle?: string;
    date: string;
    location: string;
    guests: string;
    description: string;
  };
  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    image: string;
    video?: string;
    stats: { value: string; label: string }[];
  };
  cocktails: {
    name: string;
    image: string;
    description: string;
    ingredients: string[];
  }[];
  gallery: { src: string; alt: string }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function StoryMedia({ story }: { story: EventContent["story"] }) {
  if (story.video) {
    const ig = story.video.match(/instagram\.com\/(p|reel)\/([^/?#]+)/);
    if (ig) {
      return (
        <iframe
          src={`https://www.instagram.com/${ig[1]}/${ig[2]}/embed/`}
          className="absolute inset-0 w-full h-full border-0"
          scrolling="no"
          allowTransparency={true}
        />
      );
    }
    return <StoryVideoPlayer src={story.video} />;
  }
  if (!story.image) return null;
  return (
    <>
      <Image src={story.image} alt={story.title} fill className="object-cover" unoptimized />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/40 to-transparent" />
    </>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function EventDetailPage({ data }: { data: EventContent }) {
  const { hero, story, cocktails, gallery } = data;

  return (
    <div className="min-h-screen bg-black text-white">
      <main>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          <div className="absolute inset-0">
            <Image
              src={hero.image}
              alt={hero.title}
              fill
              className="object-cover opacity-30"
              priority
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
          </div>
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 right-0 pointer-events-none -translate-y-32">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          </div>
          <div className="absolute top-1/2 left-0 right-0 pointer-events-none translate-y-32">
            <div className="h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          </div>

          {/* Zone sous la navbar : lien retour */}
          <div className="relative z-20 flex items-center px-6 md:px-10" style={{ paddingTop: '6.5rem' }}>
            <Link
              href="/#realisation"
              className="inline-flex items-center gap-2 text-[#C9A96E] text-sm tracking-widest uppercase hover:text-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              <ChevronLeft size={16} />
              Nos Réalisations
            </Link>
          </div>

          {/* Content centré dans l'espace restant */}
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center items-center py-16">
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-6 opacity-80"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Nos Réalisations
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#C9A96E]/50" />
              <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/70" />
              <div className="h-px w-16 bg-[#C9A96E]/50" />
            </div>
            <h1
              className="text-4xl md:text-6xl lg:text-7xl text-white tracking-wide leading-tight mb-4"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              {hero.title}{" "}
              <span className="text-[#C9A96E]">{hero.titleAccent}</span>
            </h1>
            {hero.subtitle && (
              <p
                className="text-[#C9A96E]/70 text-base md:text-lg tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                {hero.subtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
              <span
                className="inline-flex items-center gap-2 text-white/70 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                <Calendar size={14} className="text-[#C9A96E]" />
                {hero.date}
              </span>
              <div className="w-px h-4 bg-[#C9A96E]/30" />
              <span
                className="inline-flex items-center gap-2 text-white/70 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                <MapPin size={14} className="text-[#C9A96E]" />
                {hero.location}
              </span>
              <div className="w-px h-4 bg-[#C9A96E]/30" />
              <span
                className="text-white/70 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                {hero.guests}
              </span>
            </div>
            <p
              className="text-white/70 text-base md:text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              {hero.description}
            </p>
            <div className="flex items-center justify-center gap-4 mt-10">
              <div className="h-px w-16 bg-[#C9A96E]/50" />
              <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/70" />
              <div className="h-px w-16 bg-[#C9A96E]/50" />
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
            <div className="w-px h-12 bg-gradient-to-b from-[#C9A96E] to-transparent" />
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="relative py-24 bg-[#050505] overflow-hidden">
          <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
          <div className="relative z-10 container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <p
                  className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4 opacity-80"
                  style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                >
                  {story.eyebrow}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px w-10 bg-[#C9A96E]/50" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E]/70" />
                </div>
                <h2
                  className="text-3xl md:text-4xl text-white tracking-wide leading-snug mb-8"
                  style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
                >
                  {story.title}
                </h2>
                <div
                  className="space-y-5 text-white/70 text-sm md:text-base leading-relaxed"
                  style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                >
                  {story.paragraphs.map((p, i) => <p key={i} className="whitespace-pre-wrap">{p}</p>)}
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50 z-10" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50 z-10" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/50 z-10" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/50 z-10" />
                  <StoryMedia story={story} />
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {story.stats.map(({ value, label }) => (
                <div
                  key={label}
                  className="relative bg-black/60 border border-[#C9A96E]/15 p-8 text-center"
                >
                  <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/50" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/50" />
                  <p
                    className="text-3xl md:text-4xl text-[#C9A96E] mb-2"
                    style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
                  >
                    {value}
                  </p>
                  <p
                    className="text-xs tracking-[0.3em] uppercase text-white/55"
                    style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COCKTAILS ── */}
        {cocktails.length > 0 && (
          <section className="relative py-24 bg-black overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
              <div className="mb-16">
                <SectionTitle eyebrow="La Carte" title="Cocktails de la Soirée" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {cocktails.map(({ name, image, description, ingredients }) => (
                  <div
                    key={name}
                    className="relative bg-[#0A0A0A] border border-[#C9A96E]/15 overflow-hidden group hover:border-[#C9A96E]/40 transition-all duration-500"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                    </div>
                    <div className="relative p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-[#C9A96E]/20" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-[#C9A96E]/60" />
                        <div className="h-px flex-1 bg-[#C9A96E]/20" />
                      </div>
                      <h3
                        className="text-xl text-[#C9A96E] tracking-wide mb-4"
                        style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
                      >
                        {name}
                      </h3>
                      {description && (
                        <p
                          className="text-white/55 text-sm leading-relaxed mb-3 whitespace-pre-wrap"
                          style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                        >
                          {description}
                        </p>
                      )}
                      {ingredients.filter(s => s.trim()).length > 0 && (
                        <ul
                          className="space-y-1.5 text-white/55 text-sm"
                          style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                        >
                          {ingredients.filter(s => s.trim()).map((ing) => (
                            <li key={ing} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#C9A96E]/40 flex-shrink-0" />
                              {ing}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── GALLERY ── */}
        {gallery.length > 0 && (
          <section className="relative py-24 bg-[#050505] overflow-hidden">
            <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
            <div className="relative z-10 container mx-auto px-6 max-w-6xl">
              <div className="mb-16">
                <SectionTitle title="Galerie Photos" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map(({ src, alt }, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden group border border-[#C9A96E]/10 hover:border-[#C9A96E]/35 transition-all duration-500"
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-[#050505]/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-300" />
                    <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-300" />
                    <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-300" />
                    <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/0 group-hover:border-[#C9A96E]/60 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="relative py-28 bg-black overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
          <div className="relative z-10 container mx-auto px-6 max-w-3xl text-center">
            <p
              className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-6 opacity-80"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Travaillons ensemble
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#C9A96E]/50" />
              <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/70" />
              <div className="h-px w-16 bg-[#C9A96E]/50" />
            </div>
            <h2
              className="text-3xl md:text-5xl text-white tracking-wide mb-6"
              style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            >
              Vous organisez un événement ?
            </h2>
            <p
              className="text-white/70 text-base leading-relaxed mb-10"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Confiez-nous l&apos;art du bar pour votre prochain événement et offrez à vos
              invités une expérience cocktail unique et mémorable.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A96E] text-black text-sm tracking-[0.2em] uppercase font-medium hover:bg-white transition-colors duration-300"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Nous contacter
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
      <Footer2 />
    </div>
  );
}


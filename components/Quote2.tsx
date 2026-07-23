import React from "react";

export default function Quote() {
  return (
    <section className="py-28 bg-[#050505] relative overflow-hidden">

      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Large decorative quote mark */}
          <div
            className="text-[120px] leading-none text-white/8 select-none mb-[-40px]"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif" }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          {/* Quote text */}
          <blockquote
            className="text-xl md:text-2xl lg:text-[2rem] text-white/80 leading-relaxed italic"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 300, lineHeight: 1.45 }}
          >
            Chez Good Old Drinks, je crois que chaque événement mérite
            une touche unique et inoubliable. C&apos;est pourquoi je
            m&apos;engage à offrir des cocktails d&apos;exception et un
            service de bar personnalisé qui reflètent l&apos;âme de vos
            célébrations.
          </blockquote>

          {/* Minimal separator */}
          <div className="flex items-center justify-center gap-4 my-10">
            <div className="w-12 h-px bg-white/20" />
            <div className="w-1 h-1 bg-white/40 rotate-45" />
            <div className="w-12 h-px bg-white/20" />
          </div>

          {/* Attribution */}
          <footer>
            <p
              className="text-white/65 text-sm mb-1"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Martin Pivetta, fondateur de
            </p>
            <p
              className="text-white/60 text-[0.6rem] tracking-[0.35em] uppercase"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Good Old Drinks
            </p>
          </footer>

        </div>
      </div>
    </section>
  );
}

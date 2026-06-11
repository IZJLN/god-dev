import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PhotoHeader from "@/assets/PhotoHeader.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-black">

      {/* ── Background image full-bleed ── */}
      <div className="absolute inset-0">
        <Image
          src={PhotoHeader}
          alt="Good Old Drinks — Barman"
          fill
          className="object-cover object-center"
          priority
          quality={95}
        />
        {/* Gradient : dark at bottom, lighter at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        {/* Subtle left vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full pb-20 lg:pb-28">
        <div className="container mx-auto px-6">

          {/* Section tag */}
          <div className="god-tag mb-10">
            <span className="god-tag__text">@ g o o d o l d d r i n k s</span>
            <span className="god-tag__line" />
          </div>

          {/* Main headline — Didone editorial, very large */}
          <h1
            className="god-title text-[clamp(4.5rem,13vw,12rem)] mb-6"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
          >
            Good
            <br />
            Old Drinks
          </h1>

          {/* Sub-headline */}
          <p
            className="text-[0.65rem] tracking-[0.4em] uppercase text-white/50 mb-10 max-w-sm"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            L&apos;art du cocktail pour sublimer vos évènements
          </p>

          {/* CTA row */}
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="#contact">
              <button
                className="px-10 py-3.5 border border-white text-white text-[0.65rem] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Demander un devis
              </button>
            </Link>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/goodolddrinks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/25 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href="https://www.facebook.com/good.old.drinks"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/25 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2 opacity-30">
        <div className="w-px h-10 bg-white" />
        <span
          className="text-[9px] tracking-[0.3em] uppercase text-white rotate-90 origin-center mt-2"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          Scroll
        </span>
      </div>

    </section>
  );
};

export default Hero;

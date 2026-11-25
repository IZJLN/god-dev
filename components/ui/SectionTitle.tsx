import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  light?: boolean;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  eyebrow,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`text-center ${className}`}>

      {/* Tag pattern symétrique */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <span className="god-tag__line" />
        <span className="god-tag__text">@ g o o d o l d d r i n k s</span>
        <span className="god-tag__line" />
      </div>

      {/* Eyebrow */}
      {eyebrow && (
        <p
          className="text-[0.6rem] tracking-[0.35em] uppercase text-white/50 mb-3"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          {eyebrow}
        </p>
      )}

      {/* Title */}
      <h2
        className="god-title text-[clamp(2.8rem,6vw,5.5rem)] mb-0"
        style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          className="mt-6 mx-auto max-w-2xl text-sm md:text-base font-light leading-relaxed text-white/70"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

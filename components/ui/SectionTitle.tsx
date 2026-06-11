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
    <div className={`${className}`}>

      {/* Tag pattern @goodolddrinks */}
      <div className="god-tag">
        <span className="god-tag__text">@ g o o d o l d d r i n k s</span>
        <span className="god-tag__line" />
      </div>

      {/* Eyebrow */}
      {eyebrow && (
        <p
          className="text-[0.6rem] tracking-[0.35em] uppercase text-white/35 mb-3"
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
          className="mt-6 max-w-2xl text-sm md:text-base font-light leading-relaxed text-white/50"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

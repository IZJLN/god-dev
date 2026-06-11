import React from "react";

interface ArtDecoOrnamentProps {
  /** "horizontal" = the classic ◆—◆—◆ bar  |  "section" = full divider with label space */
  variant?: "horizontal" | "section" | "corner";
  color?: string;
  className?: string;
}

/**
 * Reusable Art Déco ornament component.
 * Renders a refined SVG divider that fits the Speakeasy aesthetic.
 */
export default function ArtDecoOrnament({
  variant = "horizontal",
  color = "#C9A96E",
  className = "",
}: ArtDecoOrnamentProps) {
  if (variant === "corner") {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill={color} fillOpacity="0.25" />
        <path d="M0 0 L20 0 L20 1 L1 1 L1 20 L0 20 Z" fill={color} fillOpacity="0.6" />
        <rect x="6" y="6" width="4" height="4" transform="rotate(45 8 8)" fill={color} fillOpacity="0.5" />
      </svg>
    );
  }

  if (variant === "section") {
    /*
     * Hybrid layout: CSS flex lines (always fill remaining width) +
     * a fixed-width SVG motif perfectly centred.
     * This guarantees pixel-perfect symmetry at every breakpoint.
     */
    return (
      <div className={`flex items-center w-full ${className}`}>
        {/* Left line – CSS gradient, fills available space */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to right, transparent, ${color}44)` }}
        />

        {/* Central motif – fixed 120px wide, always centred */}
        <svg
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="120"
          height="24"
          style={{ flexShrink: 0 }}
        >
          {/* ── perfectly symmetric around cx=60, cy=12 ── */}

          {/* Small outer diamonds  (cx = 60 ± 46) */}
          <rect x="11" y="9"  width="6" height="6" transform="rotate(45 14 12)"  fill={color} fillOpacity="0.4" />
          <rect x="103" y="9" width="6" height="6" transform="rotate(45 106 12)" fill={color} fillOpacity="0.4" />

          {/* Medium diamonds  (cx = 60 ± 33) */}
          <rect x="23" y="8"  width="8" height="8" transform="rotate(45 27 12)"  fill={color} fillOpacity="0.6" />
          <rect x="89" y="8"  width="8" height="8" transform="rotate(45 93 12)"  fill={color} fillOpacity="0.6" />

          {/* Short ticks  (x = 60 ± 22) */}
          <line x1="38" y1="8" x2="38" y2="16" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
          <line x1="82" y1="8" x2="82" y2="16" stroke={color} strokeOpacity="0.35" strokeWidth="1" />

          {/* Tall ticks  (x = 60 ± 16) */}
          <line x1="44" y1="6" x2="44" y2="18" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
          <line x1="76" y1="6" x2="76" y2="18" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />

          {/* Centre diamond  (cx=60, cy=12, size=12) */}
          <rect x="54" y="6" width="12" height="12" transform="rotate(45 60 12)" fill={color} fillOpacity="0.95" />
        </svg>

        {/* Right line – mirror of left */}
        <div
          className="flex-1 h-px"
          style={{ background: `linear-gradient(to left, transparent, ${color}44)` }}
        />
      </div>
    );
  }

  // Default: "horizontal"
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}44)` }} />
      <svg viewBox="0 0 48 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12">
        <rect x="0" y="4.5" width="6" height="3" transform="rotate(45 3 6)" fill={color} fillOpacity="0.45" />
        <line x1="9" y1="6" x2="16" y2="6" stroke={color} strokeOpacity="0.45" strokeWidth="1" />
        <rect x="18" y="3" width="6" height="6" transform="rotate(45 21 6)" fill={color} fillOpacity="0.85" />
        <line x1="26" y1="6" x2="33" y2="6" stroke={color} strokeOpacity="0.45" strokeWidth="1" />
        <rect x="36" y="4.5" width="6" height="3" transform="rotate(45 39 6)" fill={color} fillOpacity="0.45" />
      </svg>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(270deg, transparent, ${color}44)` }} />
    </div>
  );
}

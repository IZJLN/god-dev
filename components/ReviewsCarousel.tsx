"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Review {
  authorAttribution: { displayName: string };
  rating: number;
  text: { text: string };
  relativePublishTimeDescription: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill={i <= rating ? "#C9A96E" : "none"}
          stroke="#C9A96E"
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

const PER_PAGE = 3;

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const [page, setPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const totalPages = Math.ceil(reviews.length / PER_PAGE);
  const visible = reviews.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  const goTo = (newPage: number) => {
    if (isTransitioning || newPage === page) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setPage(newPage);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 250);
  };

  const prev = () => goTo((page - 1 + totalPages) % totalPages);
  const next = () => goTo((page + 1) % totalPages);

  return (
    <div>
      {/* Cards */}
      <div
        className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity duration-250 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {visible.map((review, i) => (
          <div
            key={i}
            className="bg-[#0C1915] border-l-2 border-[#C9A96E]/35 p-7 flex flex-col gap-5"
          >
            <Stars rating={review.rating} />

            <p
              className="text-white/70 text-sm leading-relaxed flex-1"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              &ldquo;{review.text.text}&rdquo;
            </p>

            <div className="pt-5 border-t border-white/8">
              <p
                className="text-[#E8D5B0] text-xs font-medium tracking-[0.08em]"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                {review.authorAttribution.displayName}
              </p>
              <p
                className="text-white/30 text-[0.65rem] mt-0.5"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                {review.relativePublishTimeDescription}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-10">
          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="p-2.5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              aria-label="Page précédente"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
            </button>
            <button
              onClick={next}
              className="p-2.5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              aria-label="Page suivante"
            >
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex gap-2.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-1.5 h-1.5 rotate-45 transition-all duration-300 ${
                  i === page ? "bg-[#C9A96E] scale-125" : "bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Page ${i + 1}`}
              />
            ))}
          </div>

          {/* Compteur */}
          <span
            className="text-[0.6rem] tracking-[0.2em] uppercase text-white/30"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            {page + 1} / {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}

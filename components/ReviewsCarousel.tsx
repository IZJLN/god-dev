"use client";

import { useRef, useEffect, useState } from "react";

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
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i <= rating ? "#C9A96E" : "none"} stroke="#C9A96E" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-[#0C1915] border-l-2 border-[#C9A96E]/35 p-7 flex flex-col gap-5 h-full">
      <Stars rating={review.rating} />
      <p
        className="text-white/70 text-sm leading-relaxed flex-1"
        style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
      >
        &ldquo;{review.text.text}&rdquo;
      </p>
      <div className="pt-5 border-t border-white/8">
        <p className="text-[#E8D5B0] text-xs font-medium tracking-[0.08em]"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}>
          {review.authorAttribution.displayName}
        </p>
        <p className="text-white/30 text-[0.65rem] mt-0.5"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}>
          {review.relativePublishTimeDescription}
        </p>
      </div>
    </div>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const primaryRef = useRef<HTMLUListElement>(null);
  const [setWidth, setSetWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (primaryRef.current) {
      setSetWidth(primaryRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex items-stretch"
        style={setWidth > 0 ? {
          animation: `reviews-scroll 45s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        } : undefined}
      >
        {/* Set primaire — mesuré */}
        <ul ref={primaryRef} className="flex items-stretch shrink-0">
          {reviews.map((review, i) => (
            <li key={i} className="mx-3 w-80 shrink-0">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        {/* Copie 2 */}
        <ul className="flex items-stretch shrink-0" aria-hidden>
          {reviews.map((review, i) => (
            <li key={i} className="mx-3 w-80 shrink-0">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>

        {/* Copie 3 */}
        <ul className="flex items-stretch shrink-0" aria-hidden>
          {reviews.map((review, i) => (
            <li key={i} className="mx-3 w-80 shrink-0">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>

      {setWidth > 0 && (
        <style>{`
          @keyframes reviews-scroll {
            from { transform: translateX(0px); }
            to   { transform: translateX(-${setWidth}px); }
          }
        `}</style>
      )}
    </div>
  );
}

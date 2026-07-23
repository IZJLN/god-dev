"use client";

import React, { useState } from "react";
import { CarouselNavigation } from "./CarouselNavigation";
import { CarouselDots } from "./CarouselDots";
import Image from "next/image";

interface CocktailItem {
  id: number;
  name: string;
  image: string;
  description: string;
  year: string;
}

interface Props {
  items: CocktailItem[];
}

const MocktailCarousel: React.FC<Props> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  if (!items || items.length === 0) return null;

  const handleTransition = (newIndex: number) => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const nextSlide = () => handleTransition((currentIndex + 1) % items.length);
  const prevSlide = () => handleTransition((currentIndex - 1 + items.length) % items.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[500px] overflow-hidden">
      {/* Blurred background fill */}
      <Image
        src={items[currentIndex].image}
        alt=""
        fill
        className="object-cover scale-110 blur-2xl opacity-40"
        unoptimized
        aria-hidden
      />
      {/* Full image contained */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={items[currentIndex].image}
          alt={items[currentIndex].name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
        <div className="text-center">
          {items[currentIndex].year && (
            <p
              className="text-[0.6rem] tracking-[0.35em] uppercase text-white/55 mb-3"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              {items[currentIndex].year}
            </p>
          )}
          <h2
            className="text-[clamp(2rem,5vw,3.5rem)] text-white mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700, lineHeight: 1 }}
          >
            {items[currentIndex].name}
          </h2>
          <div className="w-10 h-px bg-white/25 mx-auto mb-4" />
          <p
            className="text-sm text-white/75 max-w-md mx-auto leading-relaxed mb-8 font-light"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            {items[currentIndex].description}
          </p>
          <CarouselDots
            total={items.length}
            current={currentIndex}
            onSelect={handleTransition}
          />
        </div>
      </div>

      <CarouselNavigation onPrevious={prevSlide} onNext={nextSlide} />
    </div>
  );
};

export default MocktailCarousel;

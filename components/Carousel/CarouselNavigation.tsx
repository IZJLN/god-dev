import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
}

export const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
}) => {
  return (
    <>
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-white/70" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-white/70" />
      </button>
    </>
  );
};

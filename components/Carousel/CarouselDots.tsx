import React from "react";

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}

export const CarouselDots: React.FC<CarouselDotsProps> = ({
  total,
  current,
  onSelect,
}) => {
  return (
    <div className="flex justify-center space-x-2.5 mb-4">
      {Array.from({ length: total }, (_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-1.5 h-1.5 rotate-45 transition-all duration-300 ${
            index === current
              ? "bg-white scale-125"
              : "bg-white/25 hover:bg-white/50"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

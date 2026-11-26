"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Bmc from "@/assets/logoPartners/bmc.png";
import Hrd from "@/assets/logoPartners/hrd.svg";
import Materieldebar from "@/assets/logoPartners/materieldebar.png";
import Mtafolie from "@/assets/logoPartners/mtafolie.png";
import Siphro from "@/assets/logoPartners/siphro.png";

const logos = [
  { src: Bmc, alt: "Groupe BMC" },
  { src: Hrd, alt: "HR Difusion" },
  { src: Materieldebar, alt: "Materieldebar.com" },
  { src: Mtafolie, alt: "M ta folie" },
  { src: Siphro, alt: "Siphro" },
];

export default function LogoCarousel() {
  const primaryRef = useRef<HTMLUListElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    if (primaryRef.current) {
      setSetWidth(primaryRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="bg-black py-16 border-t border-white/5">
      <div className="container mx-auto px-6 mb-10">
        <p
          className="text-[0.6rem] tracking-[0.35em] uppercase text-white/25"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          Ils nous font confiance
        </p>
      </div>

      <div className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div
          className="flex justify-center"
          style={
            setWidth > 0
              ? { animation: `partners-scroll 25s linear infinite` }
              : undefined
          }
        >
          {/* Premier set — mesuré */}
          <ul ref={primaryRef} className="flex items-center shrink-0">
            {logos.map((logo, i) => (
              <li key={i} className="mx-12">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={40}
                  className="object-contain h-10 w-auto opacity-65 hover:opacity-95 transition-opacity duration-300 brightness-0 invert"
                />
              </li>
            ))}
          </ul>

          {/* Copie 2 */}
          <ul className="flex items-center shrink-0" aria-hidden>
            {logos.map((logo, i) => (
              <li key={i} className="mx-12">
                <Image src={logo.src} alt="" width={160} height={40}
                  className="object-contain h-10 w-auto opacity-65 brightness-0 invert"
                />
              </li>
            ))}
          </ul>

          {/* Copie 3 — assure que le défilement couvre toute la largeur */}
          <ul className="flex items-center shrink-0" aria-hidden>
            {logos.map((logo, i) => (
              <li key={i} className="mx-12">
                <Image src={logo.src} alt="" width={160} height={40}
                  className="object-contain h-10 w-auto opacity-65 brightness-0 invert"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Keyframe en pixels exacts = aucun gap possible */}
      {setWidth > 0 && (
        <style>{`
          @keyframes partners-scroll {
            from { transform: translateX(0px); }
            to   { transform: translateX(-${setWidth}px); }
          }
        `}</style>
      )}

    </section>
  );
}

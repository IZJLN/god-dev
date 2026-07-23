import Image from "next/image";
import Bmc from "@/assets/logoPartners/bmc.png";
import Hrd from "@/assets/logoPartners/hrd.svg";
import Materieldebar from "@/assets/logoPartners/materieldebar.png";
import Mtafolie from "@/assets/logoPartners/mtafolie.png";
import Siphro from "@/assets/logoPartners/siphro.png";

export default function LogoCarousel() {
  const logos = [
    { src: Bmc, alt: "Groupe BMC" },
    { src: Hrd, alt: "HR Difusion" },
    { src: Materieldebar, alt: "Materieldebar.com" },
    { src: Mtafolie, alt: "M ta folie" },
    { src: Siphro, alt: "Siphro" },
  ];

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
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll">
          {logos.map((logo, index) => (
            <li key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                className="object-contain h-10 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300 invert"
                width={160}
                height={40}
              />
            </li>
          ))}
        </ul>
        <ul
          className="flex items-center justify-center md:justify-start [&_li]:mx-10 [&_img]:max-w-none animate-infinite-scroll"
          aria-hidden="true"
        >
          {logos.map((logo, index) => (
            <li key={index}>
              <Image
                src={logo.src}
                alt={logo.alt}
                className="object-contain h-10 w-auto opacity-50 hover:opacity-80 transition-opacity duration-300 invert"
                width={160}
                height={40}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

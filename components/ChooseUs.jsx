import Image from "next/image";
import ChooseIcon1 from "../assets/icons/ChooseIcon1.svg";
import ChooseIcon2 from "../assets/icons/ChooseIcon2.svg";
import ChooseIcon3 from "../assets/icons/ChooseIcon3.svg";
import ChooseIcon4 from "../assets/icons/ChooseIcon4.svg";
import ChooseIcon5 from "../assets/icons/ChooseIcon5.svg";
import ChooseIcon6 from "../assets/icons/ChooseIcon6.svg";
import SectionTitle from "./ui/SectionTitle";

const reasons = [
  { icon: ChooseIcon1, label: "Des ingrédients de qualité" },
  { icon: ChooseIcon2, label: "Cocktails haut de gamme" },
  { icon: ChooseIcon3, label: "10 ans d'expérience" },
  { icon: ChooseIcon4, label: "Service personnalisé" },
  { icon: ChooseIcon5, label: "Art de la mixologie" },
  { icon: ChooseIcon6, label: "Ambiance unique & immersive" },
];

const ChooseUs = () => {
  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Notre expertise"
          title="Pourquoi nous choisir ?"
          subtitle="L'excellence et le souci du détail sont au cœur de chaque prestation. Grâce à une sélection rigoureuse d'ingrédients frais et à 10 années d'expérience, nous garantissons une maîtrise parfaite pour chaque occasion."
          className="mb-16"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 max-w-4xl mx-auto">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group flex flex-col items-center text-center gap-5 p-8 py-10 bg-black hover:bg-[#0A0A0A] transition-colors duration-300"
            >
              <Image
                src={item.icon}
                alt={item.label}
                width={128}
                height={128}
                className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
              <h3
                className="text-xs tracking-[0.2em] uppercase text-white/75 group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                {item.label}
              </h3>
            </div>
          ))}
        </div>

        <p
          className="mt-14 text-sm leading-relaxed text-white/65 max-w-2xl mx-auto text-center"
          style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
        >
          Chez Good Old Drinks, chaque détail est pensé pour vous offrir une expérience unique.
          Nos cocktails sont conçus avec des ingrédients minutieusement sélectionnés et un
          savoir-faire qui s&apos;inspire des techniques traditionnelles.
        </p>
      </div>
    </section>
  );
};

export default ChooseUs;

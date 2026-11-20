import React from "react";
import { PartyPopper, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SectionTitle from "./ui/SectionTitle";

const services = [
  {
    icon: PartyPopper,
    title: "Mariage",
    description:
      "Offrez à vos invités une expérience unique avec un bar à cocktails raffiné, parfaitement adapté à l'élégance et à la magie de votre journée de mariage.",
    image:
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80",
    href: "/Mariage",
  },
  {
    icon: Building2,
    title: "Événement Privé",
    description:
      "Ajoutez une touche d'exception à vos soirées privées grâce à des cocktails créatifs et un service professionnel qui enchante vos invités.",
    image:
      "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80",
    href: "/evenement-prive",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Ce que nous proposons"
          title="Nos Prestations"
          subtitle="Des rassemblements intimistes aux grandes célébrations, nous apportons l'art de la mixologie directement sur votre lieu d'événement."
          className="mb-16"
        />

        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>

        <p
          className="mt-14 text-sm leading-relaxed text-white/65 max-w-2xl"
          style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
        >
          Que ce soit pour un baptême, un EVG/EVJF, une soirée entre amis ou un afterwork d&apos;entreprise,
          chaque prestation est pensée sur-mesure. Un devis personnalisé vous sera proposé
          pour garantir des services à la hauteur de vos attentes.
        </p>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <Link href={service.href} className="group relative overflow-hidden h-[380px] bg-[#0a0a0a] block">
      <Image
        fill
        src={service.image}
        alt={service.title}
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Default */}
        <div className="transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-3">
          <h3
            className="text-3xl text-white"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
          >
            {service.title}
          </h3>
        </div>

        {/* Hover */}
        <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <h3
            className="text-3xl text-white mb-3"
            style={{ fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif", fontWeight: 700 }}
          >
            {service.title}
          </h3>
          <p
            className="text-white/75 text-sm leading-relaxed mb-5"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            {service.description}
          </p>
          <div className="flex items-center gap-3">
            <span
              className="text-[0.6rem] tracking-[0.25em] uppercase text-white/65"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              En savoir plus
            </span>
            <div className="flex-1 h-px bg-white/15 max-w-[60px]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

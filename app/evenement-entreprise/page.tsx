import React from "react";
import Image from "next/image";
import { Briefcase, Star, Users, Coffee } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Contact from "@/components/Contact";
import Footer2 from "@/components/Footer2";

interface ServiceItem { icon: React.ComponentType<{ className?: string }>; title: string; description: string; }
interface StatItem { value: string; label: string; }
interface StepItem { number: string; title: string; description: string; }

const services: ServiceItem[] = [
  { icon: Briefcase, title: "Bar Corporate Premium", description: "Un bar de prestige qui valorise l’image de votre entreprise. Élégance, discrétion et efficacité pour accueillir vos collaborateurs, clients et partenaires." },
  { icon: Star, title: "Cocktails Brandés", description: "Des créations exclusives aux couleurs de votre marque — sirops personnalisés, garnitures aux couleurs de votre charte graphique, cartes aux normes corporate." },
  { icon: Users, title: "Équipe Dédiée", description: "Des barmen en tenue professionnelle, briefés sur votre entreprise, capables de gérer de grandes affluences avec le sourire et le savoir-faire." },
  { icon: Coffee, title: "Afterwork & Team Building", description: "Animations bar, ateliers cocktails et dégustations commentées pour fédérer vos équipes autour d’un moment convivial et mémorable." },
];
const stats: StatItem[] = [
  { value: "500+", label: "Prestations réalisées" },
  { value: "Montpellier", label: "& région" },
  { value: "Sur mesure", label: "Chaque événement" },
];
const steps: StepItem[] = [
  { number: "01", title: "Brief & Objectifs", description: "Nous prenons le temps de comprendre vos enjeux : image de marque, public cible, ambiance souhaitée, contraintes logistiques et budget — pour concevoir une offre parfaitement adaptée." },
  { number: "02", title: "Conception du Concept", description: "Notre équipe élabore un concept sur mesure : carte de cocktails brandée, organisation du bar, animations prévues, matériel requis. Vous validez chaque détail avant le grand jour." },
  { number: "03", title: "Réalisation Clé en Main", description: "Le jour J, nous gérons tout : installation, service, rangement. Vous vous concentrez sur vos invités, nous nous occupons du reste avec professionnalisme et discrétion." },
];

export default function EvenementEntreprisePage() {
  return (
    <div className="min-h-screen bg-[#080E0C] text-[#E8D5B0]">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#080E0C]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1920&q=80"
            alt="Événement d’entreprise" fill className="object-cover opacity-20" priority />
        </div>
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-40" />
        <div className="absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent" />
        <div className="absolute left-0 right-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="hidden md:block w-28 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <Briefcase className="w-10 h-10 text-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <div className="hidden md:block w-28 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </div>
          <div className="relative inline-block px-10 py-8 max-w-4xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]" />
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-4" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              Good Old Drinks — Événement d’Entreprise
            </p>
            <h1 className="text-3xl md:text-5xl text-[#E8D5B0] tracking-wide leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              L&apos;Excellence au Cœur de
              <span className="block text-[#C9A96E] mt-2">Vos Événements Professionnels</span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-3 mt-10 mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/50" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/80" />
            <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/50" />
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
          </div>
          <p className="text-lg md:text-xl text-[#c8c0b4] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
            Séminaires, afterworks, team buildings, inaugurations — élevons ensemble chaque moment professionnel au rang d’expérience mémorable.
          </p>
        </div>
      </section>
      {/* OVERVIEW */}
      <section className="py-24 bg-[#0C1915] relative">
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            eyebrow="Expertise Corporate"
            title="Le Cocktail au Service de Votre Image"
            subtitle="Chaque événement d&apos;entreprise est une opportunité de renforcer votre marque et de créer des liens. Notre service de bar mobile professionnel transforme vos séminaires, afterworks et inaugurations en moments d&apos;exception."
            className="mb-16"
          />
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-[#c8c0b4] text-base md:text-lg leading-relaxed text-center" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              De la petite réunion au grand gala de 1 000 personnes, nous adaptons notre dispositif à vos besoins.
              Cocktails brandés, animations team building, ateliers de mixologie ou service de réception classique —
              notre équipe sait se fondre dans chaque contexte professionnel tout en élevant l’expérience globale de vos invités.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="relative bg-[#111A17] border border-[#C9A96E]/10 p-8 text-center">
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/50" />
                <p className="text-3xl text-[#C9A96E] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{stat.value}</p>
                <p className="text-xs tracking-[0.2em] uppercase text-[#8A7B68]" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 bg-[#080E0C] relative">
        <div className="container mx-auto px-4">
          <SectionTitle
            eyebrow="Nos Offres"
            title="Prestations Corporate"
            subtitle="Des solutions clé en main pour chaque format d&apos;événement professionnel, avec la qualité Good Old Drinks."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <div key={service.title} className="relative bg-[#111A17] border border-[#C9A96E]/10 p-8 group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/50" />
                <service.icon className="w-9 h-9 text-[#C9A96E] mb-5" />
                <h3 className="text-xl text-[#E8D5B0] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{service.title}</h3>
                <p className="text-[#c8c0b4] text-sm leading-relaxed" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 bg-[#0C1915] relative">
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            eyebrow="Notre Méthode"
            title="Un Processus Rodé"
            subtitle="De la prise de brief à la dernière tournée, nous orchestrons chaque étape avec rigueur et créativité."
            className="mb-16"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+2.5rem)] right-0 h-px bg-[#C9A96E]/20" />
                )}
                <div className="relative w-20 h-20 rounded-full border border-[#C9A96E]/40 bg-[#111A17] flex items-center justify-center mb-6 z-10">
                  <span className="text-2xl text-[#C9A96E]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{step.number}</span>
                </div>
                <div className="bg-[#111A17] border border-[#C9A96E]/10 p-7 relative w-full">
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
                  <h3 className="text-lg text-[#E8D5B0] mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{step.title}</h3>
                  <p className="text-[#8A7B68] text-sm leading-relaxed" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* TESTIMONIAL */}
      <section className="py-24 bg-[#080E0C] relative">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative bg-[#111A17] border border-[#C9A96E]/15 px-10 py-14">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/60 to-transparent" />
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#C9A96E]/50" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#C9A96E]/50" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#C9A96E]/50" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#C9A96E]/50" />
              <div className="text-7xl text-[#C9A96E]/20 leading-none mb-4 select-none" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                &ldquo;
              </div>
              <p className="text-[#c8c0b4] text-lg md:text-xl leading-relaxed mb-8 italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                Good Old Drinks a transformé notre afterwork annuel en un véritable événement corporate.
                Les cocktails brandés à nos couleurs ont impressionné tous nos clients et partenaires.
                Une équipe professionnelle, réactive et passionnée.
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-px bg-[#C9A96E]/40" />
                <div>
                  <p className="text-[#C9A96E] text-sm tracking-widest uppercase" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
                    Sophie Laurent
                  </p>
                  <p className="text-[#8A7B68] text-xs mt-1" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
                    Directrice Marketing, TechSud Group
                  </p>
                </div>
                <div className="w-12 h-px bg-[#C9A96E]/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer2 />
    </div>
  );
}
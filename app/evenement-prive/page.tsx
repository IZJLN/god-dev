import React from "react";
import Image from "next/image";
import { GlassWater, Sparkles, Users, Gem } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Contact from "@/components/Contact";
import Footer2 from "@/components/Footer2";

interface ServiceItem { icon: React.ComponentType<{ className?: string }>; title: string; description: string; }
interface StatItem { value: string; label: string; }
interface StepItem { number: string; title: string; description: string; }

const services: ServiceItem[] = [
  { icon: GlassWater, title: "Bar Mobile Premium", description: "Un bar d’exception qui s’adapte à votre espace, alliant esthétique art déco et équipement professionnel pour une installation impeccable." },
  { icon: Sparkles, title: "Créations sur Mesure", description: "Des cocktails signatures imaginés autour de votre thème, vos saveurs préférées et l’histoire de votre soirée — une carte unique, rien que pour vous." },
  { icon: Users, title: "Personnel Qualifié", description: "Une équipe de barmen passionnés et formés aux standards de l’hospitalité haut de gamme, au service de vos invités tout au long de la soirée." },
  { icon: Gem, title: "Décoration & Ambiance", description: "Chaque détail compte : verrerie de qualité, garnitures artisanales, éclairage et accessoires coordonnés pour une atmosphère qui impressionne." },
];
const stats: StatItem[] = [
  { value: "300+", label: "Événements réalisés" },
  { value: "15+", label: "Ans d’expérience" },
  { value: "100%", label: "Satisfaction client" },
];
const steps: StepItem[] = [
  { number: "01", title: "Prise de Contact", description: "Échangeons sur votre projet : date, lieu, nombre d’invités, ambiance souhaitée. Un premier appel suffit pour poser les bases de votre soirée idéale." },
  { number: "02", title: "Conception sur Mesure", description: "Nous élaborons une proposition personnalisée — carte de cocktails, décoration du bar, logistique — adaptée à votre vision et à votre budget." },
  { number: "03", title: "Jour J", description: "Notre équipe arrive en avance, installe tout avec soin et assure un service fluide et élégant du premier verre jusqu’au dernier toast." },
];

export default function EvenementPrivePage() {
  return (
    <div className="min-h-screen bg-[#080E0C] text-[#E8D5B0]">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#080E0C]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1920&q=80"
            alt="Soirée privée élégante" fill className="object-cover opacity-20" priority />
        </div>
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-40" />
        <div className="absolute left-0 right-0 top-[30%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
        <div className="absolute left-0 right-0 bottom-[30%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="hidden md:block w-32 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <GlassWater className="w-10 h-10 text-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <div className="hidden md:block w-32 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </div>
          <div className="relative inline-block px-10 py-8">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]" />
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-4" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              Good Old Drinks — Événement Privé
            </p>
            <h1 className="text-4xl md:text-6xl text-[#E8D5B0] tracking-wide" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Vos Soirées,
              <span className="block text-[#C9A96E] mt-2">Sublimées</span>
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
            De l&apos;anniversaire intime au dîner de gala, nous orchestrons chaque détail pour que votre soirée reste gravée dans les mémoires.
          </p>
        </div>
      </section>
      {/* OVERVIEW */}
      <section className="py-24 bg-[#0C1915] relative">
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            eyebrow="Notre Savoir-Faire"
            title="L&apos;Art de la Soirée Privée"
            subtitle="Chaque événement privé mérite une attention singulière. Qu&apos;il s&apos;agisse d&apos;un anniversaire mémorable, d&apos;un dîner élégant entre amis ou d&apos;une célébration en famille, nous façonnons des expériences sur mesure où le cocktail devient le fil conducteur de votre soirée."
            className="mb-16"
          />
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-[#c8c0b4] text-base md:text-lg leading-relaxed text-center" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              Notre approche repose sur l&apos;écoute et la créativité. Nous concevons des cartes de cocktails qui racontent votre histoire, sélectionnons les meilleurs spiritueux et mobilisons une équipe de professionnels discrets et attentionnés — pour que vous profitiez pleinement de chaque instant.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="relative bg-[#111A17] border border-[#C9A96E]/10 p-8 text-center">
                <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C9A96E]/50" />
                <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C9A96E]/50" />
                <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#C9A96E]/50" />
                <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#C9A96E]/50" />
                <p className="text-4xl text-[#C9A96E] mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{stat.value}</p>
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
            eyebrow="Ce que nous proposons"
            title="Nos Prestations"
            subtitle="Un service complet, pensé dans les moindres détails pour que votre soirée privée atteigne un niveau d&apos;excellence rare."
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
            eyebrow="Comment ça se passe"
            title="Notre Processus"
            subtitle="Trois étapes simples pour une soirée d&apos;exception, pilotée de A à Z par notre équipe."
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

      <Contact />
      <Footer2 />
    </div>
  );
}
import React from "react";
import Image from "next/image";
import { BookOpen, GraduationCap, BarChart2, Lightbulb } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Contact from "@/components/Contact";
import Footer2 from "@/components/Footer2";

interface ServiceItem { icon: React.ComponentType<{ className?: string }>; title: string; description: string; }
interface StatItem { value: string; label: string; }
interface StepItem { number: string; title: string; description: string; }

const services: ServiceItem[] = [
  { icon: BookOpen, title: "Création de Carte Cocktails", description: "Nous concevons une carte cocktails unique et cohérente, adaptée à votre concept, à votre clientèle et à votre saisonnalité — des signatures fortes qui font revenir." },
  { icon: GraduationCap, title: "Formation Bartending", description: "Sessions de formation professionnelle pour vos équipes : techniques de base, flair, gestion du bar en service, créativité et présentation — du débutant au confirmé." },
  { icon: BarChart2, title: "Audit & Optimisation Bar", description: "Analyse complète de votre espace bar : organisation, stocks, rentabilité des cocktails, rotation des produits. Nous identifions les leviers d’amélioration et vous guidons pas à pas." },
  { icon: Lightbulb, title: "Développement de Concept", description: "Vous ouvrez un bar, un restaurant ou un hôtel ? Nous vous accompagnons dans la création d’un concept bar fort et différenciant, de la philosophie aux premiers cocktails." },
];
const stats: StatItem[] = [
  { value: "10+", label: "Ans d’expertise" },
  { value: "50+", label: "Cartes créées" },
  { value: "Formation", label: "Certifiée pro" },
];
const steps: StepItem[] = [
  { number: "01", title: "Analyse & Diagnostic", description: "Nous immergeons dans votre univers : visite de l’établissement, entretiens avec vos équipes, analyse de l’offre existante et étude de votre clientèle cible pour une vision à 360°." },
  { number: "02", title: "Conception & Stratégie", description: "Sur la base du diagnostic, nous élaborons des recommandations concrètes : repositionnement de la carte, formations ciblées, réorganisation du bar ou développement d’un concept inédit." },
  { number: "03", title: "Accompagnement", description: "Nous ne disparaissons pas après la livraison. Suivi régulier, ajustements, formations complémentaires — nous restons à vos côtés jusqu’à ce que les résultats soient au rendez-vous." },
];

export default function ConsultingPage() {
  return (
    <div className="min-h-screen bg-[#080E0C] text-[#E8D5B0]">

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#080E0C]">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1513470939372-bd520e7d77db?q=80&w=1920&auto=format&fit=crop"
            alt="Consulting bar expertise" fill className="object-cover opacity-20" priority />
        </div>
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-40" />
        <div className="absolute left-0 right-0 top-[28%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent" />
        <div className="absolute left-0 right-0 bottom-[28%] h-px bg-gradient-to-r from-transparent via-[#C9A96E]/25 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="hidden md:block w-32 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <BookOpen className="w-10 h-10 text-[#C9A96E]" />
            <div className="w-3 h-3 rotate-45 bg-[#C9A96E]" />
            <div className="hidden md:block w-32 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </div>
          <div className="relative inline-block px-10 py-8 max-w-3xl">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C9A96E]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C9A96E]" />
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E]/70 mb-4" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              Good Old Drinks — Consulting
            </p>
            <h1 className="text-4xl md:text-6xl text-[#E8D5B0] tracking-wide leading-tight" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
              Votre Vision,
              <span className="block text-[#C9A96E] mt-2">Notre Expertise</span>
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
            De la création de votre carte cocktails à la formation de vos équipes, nous mettons notre expertise
            au service de votre établissement pour en faire une référence dans votre domaine.
          </p>
        </div>
      </section>
      {/* OVERVIEW */}
      <section className="py-24 bg-[#0C1915] relative">
        <div className="absolute inset-0 art-deco-pattern pointer-events-none opacity-60" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionTitle
            eyebrow="Pourquoi nous choisir"
            title="Le Consulting au Service de l&apos;Excellence"
            subtitle="Bars, restaurants, hôtels — notre mission est de vous aider à construire une offre cocktails remarquable, rentable et mémorable. Nous conjuguons créativité, rigueur opérationnelle et passion pour le métier."
            className="mb-16"
          />
          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-[#c8c0b4] text-base md:text-lg leading-relaxed text-center" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
              Nous intervenons à chaque étape de votre développement : création de carte cocktails distinctive,
              formations adaptées à vos équipes, audit approfondi de votre bar, ou accompagnement dans la conception
              d’un concept entièrement nouveau. Notre approche est toujours personnalisée, ancrée dans la réalité
              de votre terrain.
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
            eyebrow="Ce que nous faisons"
            title="Nos Services de Consulting"
            subtitle="Quatre axes d&apos;expertise pour développer, structurer et pérenniser votre offre bar."
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
            eyebrow="Notre Approche"
            title="Une Méthode Éprouvée"
            subtitle="Trois phases structurées pour transformer votre bar en un lieu d&apos;exception."
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
      {/* QUOTE */}
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
              <p className="text-[#c8c0b4] text-xl md:text-2xl leading-relaxed mb-8 italic" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                La mixologie n&apos;est pas seulement l&apos;art d&apos;assembler des spiritueux —
                c&apos;est celui de raconter une histoire dans un verre, de créer une émotion
                qui transcende la simple boisson.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-16 h-px bg-[#C9A96E]/40" />
                <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/60" />
                <p className="text-[#C9A96E]/70 text-xs tracking-[0.3em] uppercase" style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}>
                  Good Old Drinks
                </p>
                <div className="w-2 h-2 rotate-45 bg-[#C9A96E]/60" />
                <div className="w-16 h-px bg-[#C9A96E]/40" />
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
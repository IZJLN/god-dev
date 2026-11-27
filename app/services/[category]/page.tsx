export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SectionTitle from "@/components/ui/SectionTitle";
import Footer2 from "@/components/Footer2";

const CATEGORY_LABELS: Record<string, string> = {
  "mariage": "Mariage",
  "soiree-privee": "Soirée privée",
  "atelier": "Atelier",
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category];
  if (!label) notFound();

  const { data: reals } = await supabase
    .from("realisations")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  return (
    <>
      <main className="min-h-screen bg-black pt-32 pb-24">
        <div className="container mx-auto px-6">
          <nav
            className="mb-10 flex items-center gap-2 text-[0.6rem] tracking-[0.2em] uppercase text-white/25"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            <Link href="/" className="hover:text-white/50 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-white/40">{label}</span>
          </nav>

          <SectionTitle
            title={label}
            subtitle="Découvrez nos réalisations pour ce type d'événement."
            className="mb-16"
          />

          {reals && reals.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reals.map((real) => (
                <RealisationCard key={real.id} event={real} />
              ))}
            </div>
          ) : (
            <div className="border border-white/8 p-16 text-center">
              <p
                className="text-white/30 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Les réalisations seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer2 />
    </>
  );
}

function RealisationCard({ event }: { event: Record<string, string> }) {
  const isLink = event.path && event.path !== "#";
  const Wrapper = isLink ? Link : ("div" as unknown as typeof Link);

  return (
    <Wrapper
      href={isLink ? event.path : "#"}
      className="group relative overflow-hidden h-[380px] bg-[#0a0a0a] block"
    >
      <Image
        fill
        src={event.image}
        alt={event.title}
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-45"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Default */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-3">
          {event.subtitle && (
            <p
              className="text-[#C9A96E]/70 text-[0.6rem] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              {event.subtitle}
            </p>
          )}
          <h3
            className="text-3xl text-white"
            style={{
              fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {event.title}
          </h3>
        </div>

        {/* Hover */}
        <div className="absolute inset-x-0 bottom-0 p-8 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          {event.subtitle && (
            <p
              className="text-[#C9A96E]/80 text-xs tracking-wide mb-2"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              {event.subtitle}
            </p>
          )}
          <h3
            className="text-3xl text-white mb-3"
            style={{
              fontFamily: "var(--font-cormorant), var(--font-playfair), Georgia, serif",
              fontWeight: 700,
            }}
          >
            {event.title}
          </h3>
          <p
            className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-5"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            {event.description}
          </p>
          {isLink && (
            <div className="flex items-center gap-3">
              <span
                className="text-[0.6rem] tracking-[0.25em] uppercase text-white/65"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Voir le détail
              </span>
              <div className="flex-1 h-px bg-white/15 max-w-[60px]" />
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

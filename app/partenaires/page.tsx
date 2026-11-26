import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import SectionTitle from "@/components/ui/SectionTitle";
import Footer2 from "@/components/Footer2";
import { ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

interface Partenaire {
  id: number;
  name: string;
  logo: string;
  description: string | null;
  website: string | null;
}

async function getPartenaires(): Promise<Partenaire[]> {
  const { data } = await supabase
    .from("partenaires")
    .select("*")
    .order("created_at", { ascending: true });
  return data ?? [];
}

export default async function PartenairesPage() {
  const partenaires = await getPartenaires();

  return (
    <div className="min-h-screen bg-[#080E0C]">
      {/* Hero */}
      <section className="pt-40 pb-24 bg-black relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "var(--pattern-url, none)" }}
        />
        <div className="container mx-auto px-6 relative">
          <div className="mb-6 flex items-center gap-3">
            <Link
              href="/"
              className="text-white/30 hover:text-[#C9A96E] text-xs tracking-[0.2em] uppercase transition-colors"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Accueil
            </Link>
            <span className="text-white/15 text-xs">—</span>
            <span
              className="text-white/50 text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              Partenaires
            </span>
          </div>

          <SectionTitle
            eyebrow="Ils nous font confiance"
            title="Nos Partenaires"
            subtitle="Nous collaborons avec des professionnels partageant notre passion pour l'excellence et la qualité afin de vous offrir les meilleures prestations."
          />
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          {partenaires.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {partenaires.map((p) => (
                <PartenaireCard key={p.id} partenaire={p} />
              ))}
            </div>
          ) : (
            <div className="border border-white/8 p-24 text-center">
              <p
                className="text-white/30 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Les partenaires seront bientôt disponibles.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer2 />
    </div>
  );
}

function PartenaireCard({ partenaire }: { partenaire: Partenaire }) {
  const hasWebsite = partenaire.website && partenaire.website.trim() !== "";

  const Inner = (
    <div className="group bg-[#0C1915] border border-white/8 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#C9A96E]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A96E]/5 hover:-translate-y-0.5 h-full">
      {/* Logo */}
      <div className="relative w-full h-20 mb-6 flex items-center justify-center">
        <Image
          src={partenaire.logo}
          alt={partenaire.name}
          fill
          className="object-contain brightness-0 invert opacity-70 group-hover:opacity-95 transition-opacity duration-300"
          unoptimized
        />
      </div>

      {/* Separator */}
      <div className="flex items-center gap-3 w-full mb-6">
        <div className="flex-1 h-px bg-[#C9A96E]/15" />
        <div className="w-1 h-1 bg-[#C9A96E]/40 rotate-45" />
        <div className="flex-1 h-px bg-[#C9A96E]/15" />
      </div>

      {/* Name */}
      <h3
        className="text-white text-xl mb-3"
        style={{
          fontFamily: "var(--font-playfair), Georgia, serif",
          fontWeight: 600,
        }}
      >
        {partenaire.name}
      </h3>

      {/* Description */}
      {partenaire.description && (
        <p
          className="text-white/50 text-sm leading-relaxed flex-1"
          style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
        >
          {partenaire.description}
        </p>
      )}

      {/* Website link */}
      {hasWebsite && (
        <div className="mt-5 flex items-center gap-2 text-[#C9A96E]/60 group-hover:text-[#C9A96E] transition-colors">
          <span
            className="text-[0.6rem] tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            Visiter le site
          </span>
          <ExternalLink size={11} />
        </div>
      )}
    </div>
  );

  if (hasWebsite) {
    return (
      <a
        href={partenaire.website!}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {Inner}
      </a>
    );
  }

  return <div>{Inner}</div>;
}

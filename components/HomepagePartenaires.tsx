import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import SectionTitle from "./ui/SectionTitle";

interface Partenaire {
  id: number;
  name: string;
  logo: string;
  description: string | null;
  website: string | null;
}

async function getFeaturedPartenaires(): Promise<Partenaire[]> {
  const { data } = await supabase
    .from("partenaires")
    .select("id, name, logo, description, website")
    .eq("featured", true)
    .order("created_at", { ascending: true })
    .limit(4);
  return data ?? [];
}

export default async function HomepagePartenaires() {
  const partenaires = await getFeaturedPartenaires();

  if (partenaires.length === 0) return null;

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <SectionTitle
          eyebrow="Ils nous font confiance"
          title="Nos Partenaires"
          className="mb-16"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {partenaires.map((p) => {
            const hasWebsite = p.website && p.website.trim() !== "";

            const inner = (
              <div className="group bg-[#0C1915] border border-white/8 rounded-2xl p-8 flex flex-col items-center text-center hover:border-[#C9A96E]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#C9A96E]/5 hover:-translate-y-0.5 h-full">
                <div className="relative w-full h-16 mb-6 flex items-center justify-center">
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    unoptimized
                  />
                </div>

                <div className="flex items-center gap-3 w-full mb-5">
                  <div className="flex-1 h-px bg-[#C9A96E]/15" />
                  <div className="w-1 h-1 bg-[#C9A96E]/40 rotate-45" />
                  <div className="flex-1 h-px bg-[#C9A96E]/15" />
                </div>

                <h3
                  className="text-white text-base mb-3"
                  style={{ fontFamily: "var(--font-playfair), Georgia, serif", fontWeight: 600 }}
                >
                  {p.name}
                </h3>

                {p.description && (
                  <p
                    className="text-white/50 text-xs leading-relaxed flex-1 line-clamp-3"
                    style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
                  >
                    {p.description}
                  </p>
                )}

                {hasWebsite && (
                  <div className="mt-4 flex items-center gap-1.5 text-[#C9A96E]/50 group-hover:text-[#C9A96E] transition-colors">
                    <span
                      className="text-[0.55rem] tracking-[0.2em] uppercase"
                      style={{ fontFamily: "var(--font-lato), sans-serif" }}
                    >
                      Visiter
                    </span>
                    <ExternalLink size={10} />
                  </div>
                )}
              </div>
            );

            return hasWebsite ? (
              <a key={p.id} href={p.website!} target="_blank" rel="noopener noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={p.id}>{inner}</div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href="/partenaires"
            className="inline-flex items-center gap-3 text-[#C9A96E] text-xs tracking-[0.3em] uppercase hover:text-white transition-colors duration-300 group"
            style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
          >
            Découvrir nos partenaires
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

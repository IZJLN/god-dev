import { unstable_noStore as noStore } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import img1 from "../assets/MansoryPhoto/1.jpg";
import img2 from "../assets/MansoryPhoto/2.jpg";
import img3 from "../assets/MansoryPhoto/3.jpg";
import img4 from "../assets/MansoryPhoto/4.jpg";
import img5 from "../assets/MansoryPhoto/5.jpg";
import img6 from "../assets/MansoryPhoto/6.jpg";
import img7 from "../assets/MansoryPhoto/7.jpg";
import img8 from "../assets/MansoryPhoto/8.jpg";
import img9 from "../assets/MansoryPhoto/9.jpg";
import img10 from "../assets/MansoryPhoto/10.jpg";
import img11 from "../assets/MansoryPhoto/11.jpg";
import img12 from "../assets/MansoryPhoto/12.jpg";
import { StaticImageData } from "next/image";

const FALLBACK: StaticImageData[] = [
  img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12,
];

async function getGalleryUrls(): Promise<string[]> {
  const urls: string[] = [];

  const [{ data: reals }, { data: events }] = await Promise.all([
    supabase.from("realisations").select("image, path").order("id", { ascending: false }),
    supabase.from("evenements").select("slug, content"),
  ]);

  const eventMap = new Map<string, { gallery?: { src: string }[] }>(
    (events ?? []).map((e) => [e.slug, e.content])
  );

  for (const real of reals ?? []) {
    // Photos de la galerie de l'événement (priorité)
    const slugMatch = real.path?.match(/\/evenement\/(.+)$/);
    if (slugMatch) {
      const content = eventMap.get(slugMatch[1]);
      for (const item of content?.gallery ?? []) {
        if (item.src && !urls.includes(item.src)) {
          urls.push(item.src);
        }
      }
    }
    // Photo principale de la réalisation
    if (real.image && !urls.includes(real.image)) {
      urls.push(real.image);
    }
  }

  return urls;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function Gallery() {
  noStore();

  const dynamicUrls = await getGalleryUrls();

  // Construire la liste brute, mélanger, puis prendre 12
  const all: Array<{ src: string | StaticImageData; dynamic: boolean }> = [
    ...dynamicUrls.map((src) => ({ src, dynamic: true })),
    ...FALLBACK.map((src) => ({ src, dynamic: false })),
  ];

  const photos = shuffle(all).slice(0, 12);

  const cols = [
    photos.slice(0, 3),
    photos.slice(3, 6),
    photos.slice(6, 9),
    photos.slice(9, 12),
  ];

  return (
    <section className="bg-black py-4 px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 container mx-auto">
        {cols.map((col, ci) => (
          <div key={ci} className="grid gap-1">
            {col.map((photo, pi) => (
              <div key={pi} className="relative aspect-square overflow-hidden">
                {photo.dynamic ? (
                  <Image
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    src={photo.src as string}
                    alt={`Galerie ${ci * 3 + pi + 1}`}
                    fill
                    unoptimized
                  />
                ) : (
                  <Image
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    src={photo.src as StaticImageData}
                    alt={`Galerie ${ci * 3 + pi + 1}`}
                    fill
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Lien vers la page partenaires */}
      <div className="container mx-auto px-6 py-10 flex justify-center">
        <Link
          href="/partenaires"
          className="inline-flex items-center gap-4 text-xs tracking-[0.3em] uppercase text-white/35 hover:text-[#C9A96E] transition-colors duration-300 group"
          style={{ fontFamily: "var(--font-lato), sans-serif" }}
        >
          <span className="w-10 h-px bg-white/20 group-hover:bg-[#C9A96E]/60 transition-colors" />
          Découvrir nos partenaires
          <span className="w-10 h-px bg-white/20 group-hover:bg-[#C9A96E]/60 transition-colors" />
        </Link>
      </div>
    </section>
  );
}

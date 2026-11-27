import Image from "next/image";
import Photo from "@/assets/martin-pivetta.jpg";
import SectionTitle from "./ui/SectionTitle";

export default function AboutUs() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">

        <SectionTitle
          eyebrow="Notre histoire"
          title="Qui sommes nous ?"
          className="mb-16"
        />

        <div className="grid lg:grid-cols-[2fr_3fr] gap-16 items-center max-w-6xl mx-auto">

          {/* Photo */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src={Photo}
              alt="Martin Pivetta — Fondateur Good Old Drinks"
              fill
              className="object-cover object-top"
              sizes="(max-width:1024px)100vw,50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          {/* Texte */}
          <div className="flex flex-col gap-6">
            <p
              className="text-white/70 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Mariages, soirées d&apos;entreprise, inaugurations, événements privés ou ateliers mixologie, Good Old Drinks installe l&apos;élégance d&apos;un bar à cocktails directement sur le lieu de vos événements, partout en France depuis Montpellier. Nous proposons des prestations 100 % clés en main avec des bars mobiles totalement autonomes, une équipe de bartenders dédiée pour garantir un service fluide, et la touche visuelle qui marque les esprits : bulles de fumée aromatique, impressions comestibles ou garnitures travaillées, pour que vous n&apos;ayez plus qu&apos;à profiter de vos invités.
            </p>
            <p
              className="text-white/70 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Derrière ce savoir-faire, il y a{" "}
              <span className="text-[#E8D5B0] font-medium">Martin Pivetta</span> : fondateur, bartender passionné, formateur en école de bar à Montpellier et co-organisateur du concours professionnel Mixo Contest au salon SIPRHO. Fort de cette expérience de terrain et de transmission, il met la rigueur du monde du bar au service de vos réceptions.
            </p>
            <p
              className="text-white/70 text-lg leading-relaxed"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Notre philosophie repose sur l&apos;exigence du goût et l&apos;artisanat. Nous travaillons en priorité avec des spiritueux français, bio et artisanaux, que nous sublimons avec nos propres sirops, cordiaux et liqueurs faits maison. Chaque carte est pensée sur-mesure pour s&apos;accorder à votre univers, en intégrant de véritables mocktails travaillés, afin que chaque invité profite de la même expérience gustative.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

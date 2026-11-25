import SectionTitle from "./ui/SectionTitle";
import ReviewsCarousel from "./ReviewsCarousel";

interface Review {
  authorAttribution: { displayName: string };
  rating: number;
  text: { text: string };
  relativePublishTimeDescription: string;
}

interface PlaceData {
  rating: number;
  userRatingCount: number;
  reviews: Review[];
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= rating ? "#C9A96E" : "none"}
          stroke="#C9A96E"
          strokeWidth="1.5"
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

async function getPlaceData(): Promise<PlaceData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        },
        next: { revalidate: 3600 },
      }
    );
    const data = await res.json();
    if (!data.rating) return null;
    return data as PlaceData;
  } catch {
    return null;
  }
}

export default async function GoogleReviews() {
  const data = await getPlaceData();

  if (!data) return null;

  const reviews = (data.reviews || [])
    .filter((r) => r.text?.text && r.text.text.length > 20)
    .slice(0, 6);

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">

        <SectionTitle
          eyebrow="Témoignages"
          title="Vos retours"
          className="mb-16"
        />

        {/* Note globale */}
        <div className="flex items-center gap-6 mb-14 py-7 border-t border-b border-white/8 w-fit">
          <span
            className="text-[4rem] leading-none font-bold text-[#C9A96E]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {data.rating?.toFixed(1)}
          </span>
          <div className="flex flex-col gap-2">
            <Stars rating={Math.round(data.rating)} size={15} />
            <p
              className="text-[0.6rem] tracking-[0.25em] uppercase text-white/40"
              style={{ fontFamily: "var(--font-lato), sans-serif" }}
            >
              {data.userRatingCount} avis Google
            </p>
          </div>
        </div>

        {/* Carousel des avis */}
        <ReviewsCarousel reviews={reviews} />

        {/* Attribution Google (obligatoire par CGU) */}
        <div className="flex items-center gap-2 mt-10">
          <span
            className="text-[#8A7B68] text-xs"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            Avis provenant de
          </span>
          <svg width="46" height="16" viewBox="0 0 272 92" aria-label="Google">
            <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18S71.25 59.95 71.25 47.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335"/>
            <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.86 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05"/>
            <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4"/>
            <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853"/>
            <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335"/>
            <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4"/>
          </svg>
        </div>

      </div>
    </section>
  );
}

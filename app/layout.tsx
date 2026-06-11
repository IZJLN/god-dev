import type { Metadata, Viewport } from "next";
import { Oswald, Playfair_Display, Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import ParallaxWrapper from "@/components/ParallaxWrapper";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Good Old Drinks - Service de Bar Mobile et Cocktails Personnalisés",
  description:
    "Barman privé pour vos événements : cocktails sur-mesure, service professionnel et animations pour sublimer vos soirées, mariages ou réceptions.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${oswald.variable} ${playfair.variable} ${cormorant.variable} ${lato.variable} font-primary antialiased`}
      >
        <ParallaxWrapper>
          <Header />
          {children}
        </ParallaxWrapper>
      </body>
    </html>
  );
}

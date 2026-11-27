export const dynamic = 'force-dynamic';

import Hero from "../components/Hero";

import Quote2 from "../components/Quote2";

import ChooseUs from "../components/ChooseUs";

import Footer2 from "../components/Footer2";
import Contact from "../components/Contact";
import Service from "../components/Services";
import Carousel from "@/components/Carousel/Carousel";
import GoogleReviews from "@/components/GoogleReviews";
import Event from "../components/Event";
import PartnersCarousel from "@/components/PartnersCarousel";
import MansoryGalery from "@/components/MansoryGalery";
import HomepagePartenaires from "@/components/HomepagePartenaires";
import AboutUs from "@/components/AboutUs";

export default function Home() {
  return (
    <>
      <Hero />

      <Service />
      <Carousel />
      <GoogleReviews />

      <Quote2 />
      <PartnersCarousel />
      <MansoryGalery />
      <AboutUs />
      <HomepagePartenaires />
      <ChooseUs />
      <Contact />
      <Event />

      <Footer2 />
    </>
  );
}

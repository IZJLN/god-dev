"use client";
import Image from "next/image";
import Logo from "@/assets/DORE.png";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "Cocktails", href: "/#cocktails" },
  { label: "Réalisations", href: "/#realisation" },
  { label: "Infos & Contact", href: "/#contact" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/dashboard")) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-2 bg-black/92 backdrop-blur-md border-b border-white/8"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Mobile logo */}
        <Link href="/" className="lg:hidden">
          <Image src={Logo} alt="Good Old Drinks" width={130} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex w-full items-center justify-center gap-0">
          {/* Left links */}
          <div className="flex items-center gap-10 mr-12">
            {navLinks.slice(0, 2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link font-label text-sm tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-oswald), sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link href="/" className="mx-8 flex-shrink-0">
            <Image
              src={Logo}
              alt="Good Old Drinks"
              width={175}
              priority
              className="transition-opacity duration-300 hover:opacity-80"
            />
          </Link>

          {/* Right links */}
          <div className="flex items-center gap-10 ml-12">
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link font-label text-sm tracking-[0.18em] uppercase text-white/60 hover:text-white transition-colors duration-300"
                style={{ fontFamily: "var(--font-oswald), sans-serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
};

export default Header;

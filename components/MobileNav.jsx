"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Mail, Instagram, Facebook } from "lucide-react";
import Logo from "@/assets/DORE.png";

const navLinks = [
  { label: "Nos Services", href: "/#services" },
  { label: "Nos Cocktails", href: "/#cocktails" },
  { label: "Nos Réalisations", href: "/#realisation" },
  { label: "Infos & Contact", href: "/#contact" },
];

const serviceLinks = [
  { label: "Mariage", href: "/Mariage" },
  { label: "Événement Privé", href: "/evenement-prive" },
  { label: "Événement d'Entreprise", href: "/evenement-entreprise" },
  { label: "Consulting", href: "/consulting" },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setServicesOpen(false);
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const overlay = (
    <>
      {/* Backdrop */}
      <div
        onClick={close}
        className={`fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[201] h-full w-[85%] max-w-sm bg-[#0a0a0a] border-l border-white/8 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/8">
          <Image src={Logo} alt="Good Old Drinks" width={120} priority />
          <button
            onClick={close}
            aria-label="Fermer le menu"
            className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-white transition-colors duration-200"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={i}>
                {link.label === "Nos Services" ? (
                  <>
                    <button
                      onClick={() => setServicesOpen((v) => !v)}
                      className="w-full flex items-center justify-between py-4 text-left border-b border-white/8 group"
                    >
                      <span
                        className="text-sm tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-200"
                        style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                      >
                        {link.label}
                      </span>
                      <span
                        className={`text-white/50 text-xs transition-transform duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        servicesOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="pl-4 py-2 space-y-1">
                        {serviceLinks.map((s, j) => (
                          <li key={j}>
                            <Link
                              href={s.href}
                              onClick={close}
                              className="flex items-center gap-2 py-2.5 text-white/60 hover:text-white transition-colors duration-200"
                            >
                              <div className="w-1 h-1 bg-[#C9A96E]/60 rotate-45 flex-shrink-0" />
                              <span
                                className="text-xs tracking-[0.15em] uppercase"
                                style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                              >
                                {s.label}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 border-b border-white/8 group"
                  >
                    <span
                      className="text-sm tracking-[0.2em] uppercase text-white/80 group-hover:text-white transition-colors duration-200"
                      style={{ fontFamily: "var(--font-oswald), sans-serif" }}
                    >
                      {link.label}
                    </span>
                    <span className="text-white/40 group-hover:text-white/70 group-hover:translate-x-1 transition-all duration-200 text-xs">
                      →
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="px-6 py-6 border-t border-white/8 space-y-5">
          <div className="space-y-2">
            <a
              href="tel:+33659322131"
              className="flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors duration-200"
            >
              <Phone size={13} className="text-white/40 flex-shrink-0" />
              <span
                className="text-xs tracking-wide"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                06 59 32 21 31
              </span>
            </a>
            <a
              href="mailto:goodolddrinks@gmail.com"
              className="flex items-center gap-3 text-white/60 hover:text-white/90 transition-colors duration-200"
            >
              <Mail size={13} className="text-white/40 flex-shrink-0" />
              <span
                className="text-xs tracking-wide"
                style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
              >
                goodolddrinks@gmail.com
              </span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/goodolddrinks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center w-9 h-9 border border-white/20 hover:border-[#C9A96E]/60 text-white/60 hover:text-white transition-all duration-200"
            >
              <Instagram size={15} />
            </a>
            <a
              href="https://www.facebook.com/good.old.drinks"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex items-center justify-center w-9 h-9 border border-white/20 hover:border-[#C9A96E]/60 text-white/60 hover:text-white transition-all duration-200"
            >
              <Facebook size={15} />
            </a>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="lg:hidden">
      {/* Burger button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir le menu"
        className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors duration-200"
      >
        <Menu size={26} />
      </button>

      {/* Portal — renders outside the header to avoid backdrop-filter containment */}
      {mounted && createPortal(overlay, document.body)}
    </div>
  );
};

export default MobileNav;

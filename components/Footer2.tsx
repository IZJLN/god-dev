import React from "react";
import { Mail, Phone } from "lucide-react";
import InstagramIcon from "./ui/InstagramIcon";
import Image from "next/image";
import Logo from "@/assets/DORE.png";

const footerLinkClass =
  "text-white/55 hover:text-white/90 transition-colors duration-200 text-sm";

const colHeadClass = "text-[0.55rem] tracking-[0.25em] uppercase text-white/50 mb-5";

export default function Footer() {
  return (
    <footer className="bg-black text-white relative border-t border-white/8">

      <div className="container mx-auto px-6 pt-16 pb-8 relative z-10">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Image src={Logo} alt="Good Old Drinks" width={200} />
            <p
              className="text-white/60 text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-lato), sans-serif", fontWeight: 300 }}
            >
              Barman privé pour tous vos événements
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/goodolddrinks"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 border border-white/15 hover:border-[#E1306C]/40 flex items-center justify-center transition-all duration-300"
              >
                <InstagramIcon size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className={colHeadClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Navigation</p>
            <ul className="space-y-2.5" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
              {[
                { label: "Nos services", href: "#services" },
                { label: "Cocktails", href: "#cocktails" },
                { label: "Réalisations", href: "#realisation" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={footerLinkClass}>{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className={colHeadClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Services</p>
            <ul className="space-y-2.5" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
              {["Mariages", "Soirées privées", "Soirées d'entreprise", "Événements sportifs", "Consulting"].map((s) => (
                <li key={s} className="text-white/55 text-sm">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={colHeadClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Contact</p>
            <ul className="space-y-3" style={{ fontFamily: "var(--font-lato), sans-serif" }}>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Phone size={14} className="text-white/45 flex-shrink-0" />
                <span>06 59 32 21 31</span>
              </li>
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail size={14} className="text-white/45 flex-shrink-0" />
                <span>goodolddrinks@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/8 mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            © {new Date().getFullYear()} Good Old Drinks. Tous droits réservés.
          </p>
          <div
            className="flex gap-6 text-xs"
            style={{ fontFamily: "var(--font-lato), sans-serif" }}
          >
            <a href="#" className={footerLinkClass}>Mentions légales</a>
            <a href="#" className={footerLinkClass}>Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

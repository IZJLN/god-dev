"use client";
import React, { useState } from "react";
import { Mail, Phone, Clock } from "lucide-react";
import SectionTitle from "./ui/SectionTitle";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "Soirée d'entreprise",
    location: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          eventType: "Soirée d'entreprise",
          location: "",
          message: "",
        });
      } else {
        setStatus("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur d'envoi:", error);
      setStatus("Erreur lors de l'envoi. Vérifiez votre connexion.");
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-black border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 transition-colors duration-200";
  const labelClass = "block text-[0.6rem] tracking-[0.2em] uppercase text-white/55 mb-2";

  return (
    <section id="contact" className="py-24 bg-[#050505] relative">

      <div className="container mx-auto px-6 relative z-10">
        <SectionTitle
          eyebrow="Parlons de votre projet"
          title="Contactez-nous"
          className="mb-14"
        />

        <div className="max-w-4xl mx-auto">
          {/* Info bar */}
          <div className="grid md:grid-cols-3 gap-px bg-white/5 mb-10">
            {[
              { icon: Mail, label: "Email", value: "goodolddrinks@gmail.com" },
              { icon: Phone, label: "Téléphone", value: "06 59 32 21 31" },
              { icon: Clock, label: "Disponibilité", value: "7j/7j" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-5 bg-black"
              >
                <Icon className="text-white/50 flex-shrink-0" size={18} />
                <div>
                  <p
                    className="text-[0.55rem] tracking-[0.2em] uppercase text-white/50 mb-0.5"
                    style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-white/70 text-sm"
                    style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-black border border-white/5 p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Nom</label>
                  <input
                    onChange={handleChange}
                    value={formData.name}
                    name="name"
                    type="text"
                    className={inputClass}
                    placeholder="Votre nom"
                    required
                    style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  />
                </div>
                <div>
                  <label className={labelClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Email</label>
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    type="email"
                    className={inputClass}
                    placeholder="votre@email.com"
                    style={{ fontFamily: "var(--font-lato), sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Type d&apos;événement</label>
                <select
                  onChange={handleChange}
                  value={formData.eventType}
                  name="eventType"
                  className={inputClass}
                  style={{ fontFamily: "var(--font-lato), sans-serif" }}
                >
                  <option>Soirée d&apos;entreprise</option>
                  <option>Soirée privée</option>
                  <option>Mariage</option>
                  <option>Autre...</option>
                </select>
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Lieu de l&apos;événement</label>
                <input
                  onChange={handleChange}
                  value={formData.location}
                  name="location"
                  type="text"
                  className={inputClass}
                  placeholder="Ville ou adresse"
                  style={{ fontFamily: "var(--font-lato), sans-serif" }}
                />
              </div>

              <div>
                <label className={labelClass} style={{ fontFamily: "var(--font-lato), sans-serif" }}>Message</label>
                <textarea
                  onChange={handleChange}
                  value={formData.message}
                  name="message"
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Parlez-nous de votre événement..."
                  style={{ fontFamily: "var(--font-lato), sans-serif" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 border border-white text-white text-[0.65rem] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-300"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                Envoyer la demande
              </button>
            </form>

            {status && (
              <p
                className="mt-4 text-center text-white/50 text-sm"
                style={{ fontFamily: "var(--font-lato), sans-serif" }}
              >
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

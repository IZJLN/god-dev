import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: ["Oswald", "sans-serif"],
      display: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
      body: ["Lato", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#C9A96E",
        "secondary-light": "#E8D5B0",
        "bg-dark": "#000000",
        "bg-card": "#0A0A0A",
        "text-warm": "#FFFFFF",
        "text-muted": "rgba(255,255,255,0.45)",
      },
      animation: {
        "infinite-scroll": "scroll 20s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: "#FF6A92",
        "coral-light": "#F393AE",
        "coral-pale": "#fbc7d9",
        rosa: "#f9a8d4",
        indigo: {
          DEFAULT: "#6A8AFF",
          pale: "#f0f4ff",
          soft: "#f5f3ff",
          light: "#e0e7ff",
          mid: "#c7d2fe",
        },
        lila: {
          DEFAULT: "#E894FF",
          light: "#d8b4fe",
          pale: "#c4b5f4",
        },
        grafito: "#3A3F4B",
        dorado: "#FCCD0D",
        "dorado-oscuro": "#B8860B",
      },
      fontFamily: {
        dancing: ["var(--font-dancing)", "cursive"],
        playfair: ["var(--font-playfair)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #FF6A92, #F393AE, #fbc7d9)",
        "gradient-hero": "linear-gradient(135deg, #FF6A92 0%, #E894FF 50%, #6A8AFF 100%)",
        "gradient-section": "linear-gradient(135deg, #f9a8d4, #f472b6, #a78bfa)",
        "gradient-indigo": "linear-gradient(135deg, #f0f4ff, #f5f3ff)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(106, 138, 255, 0.12)",
        "glass-hover": "0 16px 48px rgba(255, 106, 146, 0.2)",
        coral: "0 8px 32px rgba(255, 106, 146, 0.25)",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "float-medium": "float 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

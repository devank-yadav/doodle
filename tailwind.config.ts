import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        electricPink: "#FF2EB8",
        acidLime: "#B6FF2E",
        cyanPop: "#2EF2FF",
        sunnyOrange: "#FF9F2E",
        deepIndigo: "#1A1446",
        offWhite: "#FFF7EE",
        velvetNavy: "#0C0A24",
        plumGlow: "#4C1C8C",
        peachFuzz: "#FFD9C8",
        lilacMist: "#E6DAFF",
        mintFlash: "#C9FFE3"
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      boxShadow: {
        sticker: "0 18px 40px rgba(0,0,0,0.35)"
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        "orb-grid":
          "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.12), transparent 35%)",
        "noise":
          "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\' viewBox=\'0 0 120 120\'%3E%3Crect width=\'120\' height=\'120\' fill=\'%23ffffff\' opacity=\'0.03\'/%3E%3C/svg%3E')"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

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
        brand: {
          navy: "#142B45",
          "deep-navy": "#0D1B2A",
          blue: "#2867A8",
          teal: "#168A83",
          bg: "#F5F7FA",
          muted: "#64748B",
          success: "#27845B",
          warning: "#D69B35",
          error: "#C34F4F",
        },
        subject: {
          physics: "#2867A8",
          chemistry: "#168A83",
          biology: "#27845B",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

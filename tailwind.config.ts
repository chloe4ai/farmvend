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
        // Primary Green Palette
        green: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        // Apple-style Grays
        gray: {
          25: "#fafafa",
          50: "#f5f5f7",
          100: "#e5e5e7",
          200: "#d1d1d6",
          300: "#a1a1a6",
          400: "#86868b",
          500: "#6e6e73",
          600: "#424245",
          700: "#333336",
          800: "#1d1d1f",
        },
        // Glass effects
        glass: {
          white: "rgba(255, 255, 255, 0.72)",
          green: "rgba(34, 197, 94, 0.08)",
          border: "rgba(255, 255, 255, 0.5)",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0 4px 12px rgba(0, 0, 0, 0.08)",
        lg: "0 12px 40px rgba(0, 0, 0, 0.12)",
        card: "0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04)",
        "card-hover": "0 8px 24px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.04)",
      },
      backdropBlur: {
        xs: "2px",
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
      },
    },
  },
  plugins: [],
};
export default config;

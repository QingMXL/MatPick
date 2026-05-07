import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand greens — sampled from the reference UI
        brand: {
          50: "#EEF6F1",
          100: "#DCEDE2",
          200: "#B6DBC2",
          300: "#85C29B",
          400: "#52A375",
          500: "#2F8559",
          600: "#1F6B47",
          700: "#16563A",
          800: "#114530",
          900: "#0C3424",
          DEFAULT: "#1F6B47",
        },
        // Neutral surface tokens
        surface: {
          page: "#F6F8F7",
          card: "#FFFFFF",
          subtle: "#F2F4F3",
          muted: "#EEF1EF",
        },
        ink: {
          900: "#0F1A14",
          800: "#1A2620",
          700: "#2C3A33",
          600: "#4B5851",
          500: "#6B776F",
          400: "#9AA39E",
          300: "#C4CAC6",
          200: "#E2E6E3",
          100: "#EEF1EF",
        },
        line: {
          DEFAULT: "#E5E9E6",
          strong: "#D4D9D6",
        },
        warn: {
          50: "#FFF6E5",
          500: "#F2A93B",
          600: "#D4881A",
        },
        info: {
          50: "#E8F0FB",
          500: "#3B82F6",
        },
        danger: {
          50: "#FCEAEA",
          500: "#DC4949",
        },
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 26, 20, 0.04), 0 1px 3px rgba(15, 26, 20, 0.04)",
        elevated:
          "0 4px 16px rgba(15, 26, 20, 0.06), 0 1px 3px rgba(15, 26, 20, 0.04)",
        focus: "0 0 0 3px rgba(31, 107, 71, 0.18)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      fontSize: {
        xxs: ["11px", "16px"],
      },
    },
  },
  plugins: [],
};
export default config;

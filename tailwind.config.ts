import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "t-red": "#FF3B30",
        "t-blue": "#007AFF",
        "t-gray": "#8E8E93",
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        l: ["32px", "40px"],
        m: ["28px", "36px"],
        s: ["24px", "32px"],
        xs: ["20px", "28px"],
        xxs: ["12px", "18px"],
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      rotate: {
        "y-180": "180deg",
      },
      transformOrigin: {
        center: "center",
      },
      transform: ["hover", "focus"],
    },
    animation: {
      "fade-slide-up": "fadeSlideUp 0.8s ease-out forwards",
    },
    keyframes: {
      fadeSlideUp: {
        "0%": {
          opacity: "0",
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
    },
  },
};

export default config;

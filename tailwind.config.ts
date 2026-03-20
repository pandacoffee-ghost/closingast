import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        oat: "#f4efe6",
        sand: "#dfcfb0",
        ink: "#1d1b19",
        moss: "#67755a",
        clay: "#b26e4b"
      }
    }
  },
  plugins: []
};

export default config;

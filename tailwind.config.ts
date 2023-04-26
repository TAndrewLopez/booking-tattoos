import { type Config } from "tailwindcss";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-400`),
  ],
  theme: {
    extend: {
      colors: {
        chatPrimary: "#3e3c61",
      },
      fontFamily: {
        domine: ["Domine", "serif"],
        openSans: ["'Open Sans', sans-serif"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  plugins: [],
} satisfies Config;

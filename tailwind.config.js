/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./*.js",
  "./*.jsx",
  "./**/*.js",
  "./**/*.jsx",
],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#0A84FF", light: "#60A5FA" },
        navy: "#0B1F3A",
        surface: { DEFAULT: "#FFFFFF", muted: "#F1F5F9" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-18px)" } },
        scroll: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        scroll: "scroll 28s linear infinite",
      },
    },
  },
  plugins: [],
};

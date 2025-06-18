import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  theme: {
    colors: {
      primary: "#2563eb", // blue-600
      secondary: "#64748b", // slate-500
      accent: "#f59e42", // orange-400
      success: "#22c55e", // green-500
      danger: "#ef4444", // red-500
      warning: "#eab308", // yellow-500
      info: "#0ea5e9", // sky-500
      white: "#ffffff",
      black: "#000000",
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      // Add any other colors you use, all in hex/rgb only
    },
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
  },
  plugins: [],
};

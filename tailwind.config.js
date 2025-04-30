/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#e6f3fa",
          100: "#cce7f5",
          200: "#99cfeb",
          300: "#66b7e1",
          400: "#339fd7",
          500: "#0077B5", // LinkedIn blue
          600: "#005f91",
          700: "#00476d",
          800: "#002f48",
          900: "#001824",
        },
        secondary: {
          50: "#e6f7fc",
          100: "#cceef9",
          200: "#99ddf3",
          300: "#66cced",
          400: "#33bbe7",
          500: "#00A0DC", // LinkedIn light blue
          600: "#0080b0",
          700: "#006084",
          800: "#004058",
          900: "#00202c",
        },
        accent: {
          50: "#e6f9f2",
          100: "#ccf3e5",
          200: "#99e7cb",
          300: "#66dbb1",
          400: "#33cf97",
          500: "#0AB06C", // LinkedIn green
          600: "#088d56",
          700: "#066a41",
          800: "#04462b",
          900: "#022316",
        },
        success: {
          500: "#10B981",
          600: "#059669",
        },
        warning: {
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          500: "#EF4444",
          600: "#DC2626",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
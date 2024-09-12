/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        quicksand: "var(--font-quicksand)",
        poppins: "var(--font-poppins)",
      },
      colors: {
        chart: {
          DEFAULT: "hsl(var(--chart))",
        },
        midnight: "hsl(var(--midnight))",
        warning: {
          DEFAULT: "hsl(var(--warning))",
          dark: "hsl(var(--warning-dark))",
        },
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        orange: "hsl(var(--orange))",
        success: {
          DEFAULT: "hsl(var(--success))",
          100: "hsl(var(--success-100))",
        },
        purple: "hsl(var(--purple))",
        danger: {
          DEFAULT: "hsl(var(--danger))",
          100: "hsl(var(--danger-100))",
          200: "hsl(var(--danger-200))",
          300: "hsl(var(--danger-300))",
        },
        gray: {
          DEFAULT: "hsl(var(--gray))",
          dark: "hsl(var(--gray-dark))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

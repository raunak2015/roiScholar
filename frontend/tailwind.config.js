/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",
        "secondary": "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",
        "tertiary": "var(--color-tertiary)",
        "surface": "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "outline-variant": "var(--color-outline-variant)",
        "on-surface-variant": "var(--color-on-surface-variant)",
      },
      "borderRadius": {
        "DEFAULT": "0.5rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      "fontFamily": {
        "headline": ["Inter"],
        "body": ["Inter"],
        "label": ["Inter"]
      }
    },
  },
  plugins: [],
}

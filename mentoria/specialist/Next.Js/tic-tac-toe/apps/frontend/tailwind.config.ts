import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#65E9E4",
          500: "#31C8BD",
          600: "#218C87",
        },
        secondary: {
          400: "#FCC860",
          500: "#F3B136",
          600: "#CC8B13",
        },
        dark: {
          400: "#1F3631",
          500: "#1F3641",
          600: "#CC8B13",
        },
        light: {
          400: "#DBE8ED",
          500: "#A8BFC9",
          600: "#6B8997",
        },
      },
    },
  },
  safelist: [
  { pattern: /^bg-primary-(400|500|600)$/, variants: ['hover'] },
  { pattern: /^bg-secondary-(400|500|600)$/, variants: ['hover'] },
  { pattern: /^bg-dark-(400|500|600)$/, variants: ['hover'] },
  { pattern: /^bg-light-(400|500|600)$/, variants: ['hover'] },
],
  plugins: [],
};

export default config

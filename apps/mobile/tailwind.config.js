import nativewindPreset from "nativewind/preset";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.tsx",
    "../../packages/mobile/dist/components/**/*.js", // Option 1
    //"../../node_modules/@zenncore/mobile/dist/components/**/*.js", // Option 2
  ],
  presets: [nativewindPreset],
  theme: {
    extend: {
      textShadow: {
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        sm: "0 1px 2px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          dimmed: "hsl(var(--primary-dimmed))",
          rich: "hsl(var(--primary-rich))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          dimmed: "hsl(var(--secondary-dimmed))",
          rich: "hsl(var(--secondary-rich))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          dimmed: "hsl(var(--background-dimmed))",
          rich: "hsl(var(--background-rich))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dimmed: "hsl(var(--accent-dimmed))",
          rich: "hsl(var(--accent-rich))",
          foreground: "hsl(var(--accent-foreground))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          dimmed: "hsl(var(--foreground-dimmed))",
          rich: "hsl(var(--foreground-rich))",
        },
        emphasis: {
          DEFAULT: "hsl(var(--emphasis))",
          dimmed: "hsl(var(--emphasis-dimmed))",
          rich: "hsl(var(--emphasis-rich))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          dimmed: "hsl(var(--success-dimmed))",
          rich: "hsl(var(--success-rich))",
          foreground: "hsl(var(--success-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          dimmed: "hsl(var(--info-dimmed))",
          rich: "hsl(var(--info-rich))",
          foreground: "hsl(var(--info-foreground))",
        },
        neutral: {
          DEFAULT: "hsl(var(--neutral))",
          dimmed: "hsl(var(--neutral-dimmed))",
          rich: "hsl(var(--neutral-rich))",
          foreground: "hsl(var(--neutral-foreground))",
        },
        error: {
          DEFAULT: "hsl(var(--error))",
          dimmed: "hsl(var(--error-dimmed))",
          rich: "hsl(var(--error-rich))",
          foreground: "hsl(var(--error-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          dimmed: "hsl(var(--warning-dimmed))",
          rich: "hsl(var(--warning-rich))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      keyframes: {
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.2s ease-in infinite",
      },
    },
  },
};

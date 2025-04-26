
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Expanded vibrant but soft color palette
        water: {
          lightest: '#33C3F0',    // Sky Blue
          light: '#64B5F6',       // Bright Blue
          DEFAULT: '#1E88E5',     // Ocean Blue
          dark: '#0D47A1',        // Deep Blue
        },
        safety: {
          green: '#66BB6A',       // Mint Green
          yellow: '#FFA726',      // Soft Coral
          red: '#EF5350',         // Bright Red
        },
        // New vibrant palette
        coral: {
          light: '#FFAB91',
          DEFAULT: '#FF7043',
          dark: '#E64A19',
        },
        mint: {
          light: '#B2DFDB',
          DEFAULT: '#4DB6AC',
          dark: '#00897B',
        },
        sunrise: {
          light: '#FFE0B2',
          DEFAULT: '#FFB74D',
          dark: '#FF9800',
        },
        lavender: {
          light: '#D1C4E9',
          DEFAULT: '#9575CD',
          dark: '#5E35B1',
        },
        teal: {
          light: '#B2EBF2',
          DEFAULT: '#4DD0E1',
          dark: '#00ACC1',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'ripple': {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'ripple': 'ripple 1.5s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'fade-slide-up': 'fade-slide-up 0.6s ease-out forwards',
        'bounce-subtle': 'bounce-subtle 2s infinite'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-water': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
        'gradient-sunrise': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
        'gradient-mint': 'linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)',
        'gradient-teal': 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
        'gradient-lavender': 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

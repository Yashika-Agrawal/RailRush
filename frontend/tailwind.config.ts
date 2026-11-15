import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        raised: 'var(--color-raised)',
        surface: {
          1: 'var(--color-surface-1)',
          2: 'var(--color-surface-2)',
          3: 'var(--color-surface-3)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          2: 'var(--color-text-2)',
          3: 'var(--color-text-3)',
          disabled: 'var(--color-text-disabled)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        action: {
          DEFAULT: 'var(--color-action)',
          hover: 'var(--color-action-hover)',
        },
        'on-action': 'var(--color-on-action)',
        accent: 'var(--color-accent)',
        ticket: {
          DEFAULT: 'var(--color-ticket)',
          ink: 'var(--color-ticket-ink)',
        },
        secondary: 'var(--color-secondary)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)',
        info: 'var(--color-info)',
        focus: 'var(--color-focus)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)',
        data: 'var(--font-data)',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        float: 'var(--shadow-float)',
      },
      spacing: {
        'space-0': '0',
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-12': 'var(--space-12)',
        'space-16': 'var(--space-16)',
        'space-24': 'var(--space-24)',
        'space-32': 'var(--space-32)',
      },
      transitionDuration: {
        instant: 'var(--dur-instant)',
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        slow: 'var(--dur-slow)',
        route: 'var(--dur-route)',
      },
      transitionTimingFunction: {
        depart: 'var(--ease-depart)',
        arrive: 'var(--ease-arrive)',
        glide: 'var(--ease-glide)',
      },
      zIndex: {
        background: 'var(--z-background)',
        base: 'var(--z-base)',
        sticky: 'var(--z-sticky)',
        dropdown: 'var(--z-dropdown)',
        overlay: 'var(--z-overlay)',
        dialog: 'var(--z-dialog)',
        toast: 'var(--z-toast)',
        tooltip: 'var(--z-tooltip)',
      },
    },
  },
  plugins: [],
};

export default config;

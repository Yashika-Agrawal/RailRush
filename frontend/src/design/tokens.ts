/**
 * RailRush Design Tokens
 * Typed JavaScript mappings pointing strictly to CSS Custom Properties
 */

export const color = {
  bg: 'var(--color-bg)',
  raised: 'var(--color-raised)',
  surface: {
    1: 'var(--color-surface-1)',
    2: 'var(--color-surface-2)',
    3: 'var(--color-surface-3)',
  },
  text: {
    primary: 'var(--color-text)',
    secondary: 'var(--color-text-2)',
    tertiary: 'var(--color-text-3)',
    disabled: 'var(--color-text-disabled)',
  },
  border: {
    subtle: 'var(--color-border)',
    strong: 'var(--color-border-strong)',
  },
  action: {
    DEFAULT: 'var(--color-action)',
    hover: 'var(--color-action-hover)',
    onAction: 'var(--color-on-action)',
  },
  accent: 'var(--color-accent)',
  ticket: {
    bg: 'var(--color-ticket)',
    ink: 'var(--color-ticket-ink)',
  },
  secondary: 'var(--color-secondary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
  focus: 'var(--color-focus)',
} as const;

export const typography = {
  fontDisplay: 'var(--font-display)',
  fontBody: 'var(--font-body)',
  fontData: 'var(--font-data)',
} as const;

export const radius = {
  xs: 'var(--radius-xs)',
  sm: 'var(--radius-sm)',
  md: 'var(--radius-md)',
  lg: 'var(--radius-lg)',
  full: 'var(--radius-full)',
} as const;

export const zIndex = {
  background: -1,
  base: 0,
  sticky: 20,
  dropdown: 40,
  overlay: 60,
  dialog: 70,
  toast: 80,
  tooltip: 90,
} as const;

/**
 * Motion Tokens for JavaScript animations and transitions
 */

export const duration = {
  instant: 80,   // ms
  fast: 140,
  base: 220,
  slow: 400,
  route: 1100,
} as const;

export const easing = {
  depart: [0.2, 0, 0, 1] as const,       // cubic-bezier(0.2, 0, 0, 1)
  arrive: [0.3, 0, 0.8, 0.15] as const,  // cubic-bezier(0.3, 0, 0.8, 0.15)
  glide: [0.4, 0, 0.2, 1] as const,      // cubic-bezier(0.4, 0, 0.2, 1)
} as const;

export const cssEasing = {
  depart: 'cubic-bezier(0.2, 0, 0, 1)',
  arrive: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
  glide: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.5rem',
  6: '3rem',
  auto: 'auto',
} as const;

export type SpacingToken = keyof typeof spacing;

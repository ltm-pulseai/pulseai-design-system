export const colors = {
  white: '#ffffff',
  black: '#0a0a0a',
  primary: '#00d1b2',
  link: '#3273dc',
  info: '#3298dc',
  success: '#48c78e',
  warning: '#ffe08a',
  danger: '#f14668',
  greyDarker: '#121212',
  greyDark: '#363636',
  grey: '#7a7a7a',
  greyLight: '#b5b5b5',
  greyLighter: '#dbdbdb',
  whiteBis: '#fafafa',
  whiteTer: '#f5f5f5',
} as const;

export type ColorToken = keyof typeof colors;

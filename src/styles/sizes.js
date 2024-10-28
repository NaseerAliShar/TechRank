// styles/sizes.js
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');

const spacing = {
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
};

const borderRadius = {
  s: 4,
  m: 8,
  l: 16,
  xl: 24,
};

const fontSize = {
  s: 12,
  m: 16,
  l: 20,
  xl: 24,
};

const lineHeight = {
  s: 16,
  m: 20,
  l: 24,
  xl: 28,
};

const letterSpacing = {
  s: 0.8,
  m: 1,
  l: 1.2,
  xl: 1.4,
};

const breakpoints = {
  phone: 0,
  tablet: 768,
};

const device = {
  phone: `@media (min-width: ${breakpoints.phone}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
};

const shadow = {
  s: '0 1px 2px rgba(0, 0, 0, 0.1)',
  m: '0 2px 4px rgba(0, 0, 0, 0.1)',
  l: '0 4px 8px rgba(0, 0, 0, 0.1)',
  xl: '0 8px 16px rgba(0, 0, 0, 0.1)',
};

export {
  width,
  height,
  spacing,
  borderRadius,
  fontSize,
  lineHeight,
  letterSpacing,
  breakpoints,
  device,
  shadow,
};

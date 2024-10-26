// styles/sizes.js
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const sizes = {
  spacingSmall: 8,
  spacingMedium: 16,
  spacingLarge: 24,
  spacingExtraLarge: 32,
  borderRadiusSmall: 4,
  borderRadiusMedium: 10,
  borderRadiusLarge: 20,
  fontSizeText: 14,
  fontSizeTitle: 20,
  iconSizeSmall: 24,
  iconSizeLarge: 50,
  imageSizeLarge: 90,
  width,
  height,
};

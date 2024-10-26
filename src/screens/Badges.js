import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/colors';
import { sizes } from '../styles/sizes';

const Badges = () => {
  const navigation = useNavigation();
  const badges = [
    { name: 'Bronze', source: require('../../assets/images/bronze.png'), disabled: false },
    { name: 'Silver', source: require('../../assets/images/silver.png'), disabled: true },
    { name: 'Gold', source: require('../../assets/images/gold.png'), disabled: true },
    { name: 'Diamond', source: require('../../assets/images/diamond.png'), disabled: true },
  ];

  return (
    <LinearGradient colors={colors.backgroundColor} style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={styles.backgroundImage}
        style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.title}>Badges</Text>
          <View style={styles.grid}>
            {badges.map((badge, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  badge.disabled ? styles.disabled : styles.enabled,
                ]}
                activeOpacity={0.8}
                onPress={() => !badge.disabled && navigation.navigate('Quiz', { badge })}
                disabled={badge.disabled}>
                <View>
                  {badge.disabled && (
                    <MaterialIcons
                      name="lock"
                      size={sizes.iconSizeLarge}
                      color={colors.iconColor}
                      style={styles.lockIcon}
                    />
                  )}
                  <Image
                    source={badge.source}
                    style={[styles.image, badge.disabled && styles.disabledImage]}
                  />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    transform: [{ scale: 1.5 }],
  },
  cardContainer: {
    backgroundColor: colors.secondaryBackground,
    marginHorizontal: sizes.spacingLarge,
    marginTop: sizes.spacingExtraLarge,
    padding: sizes.spacingLarge,
    borderRadius: sizes.borderRadiusLarge,
    flex: 1,
  },
  title: {
    fontSize: sizes.fontSizeTitle,
    color: colors.primaryText,
    textAlign: 'center',
    marginBottom: sizes.spacingMedium,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    elevation: 4,
    borderRadius: sizes.borderRadiusMedium,
    marginVertical: sizes.spacingSmall,
    paddingVertical: sizes.spacingMedium,
    paddingHorizontal: sizes.spacingMedium,
  },
  enabled: {
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  disabled: {
    opacity: 0.7,
    backgroundColor: colors.disabledBackground,
  },
  image: {
    width: sizes.imageSizeLarge,
    height: sizes.imageSizeLarge,
    marginBottom: sizes.spacingSmall,
    resizeMode: 'contain',
  },
  disabledImage: {
    opacity: 0.3,
  },
  badgeName: {
    fontSize: sizes.fontSizeText,
    color: colors.primaryText,
    textAlign: 'center',
  },
  lockIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

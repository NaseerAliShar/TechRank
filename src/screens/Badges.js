import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { primaryColor } from '../styles/colors';
import Container from '../components/Container';

const Badges = () => {
  const navigation = useNavigation();
  const badges = [
    {
      name: 'Bronze',
      source: require('../../assets/images/bronze.png'),
      disabled: false,
    },
    {
      name: 'Silver',
      source: require('../../assets/images/silver.png'),
      disabled: true,
    },
    {
      name: 'Gold',
      source: require('../../assets/images/gold.png'),
      disabled: true,
    },
    {
      name: 'Diamond',
      source: require('../../assets/images/diamond.png'),
      disabled: true,
    },
  ];

  return (
    <Container>
      <Text style={styles.title}>All Badges</Text>
      <View style={styles.container}>
        <View style={styles.grid}>
          {badges.map((badge, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.card,
                badge.disabled ? styles.disabled : styles.enabled,
              ]}
              activeOpacity={0.8}
              onPress={() =>
                !badge.disabled && navigation.navigate('Quiz', { badge })
              }
              disabled={badge.disabled}>
              <View>
                {badge.disabled && (
                  <MaterialIcons
                    name="lock"
                    size={50}
                    color="#000"
                    style={styles.lockIcon}
                  />
                )}
                <Image
                  source={badge.source}
                  style={[styles.image, badge.disabled && styles.disabledImage]}
                />
                <Text style={styles.badgeName}>{badge.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Container>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: primaryColor,
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
    color: primaryColor,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '46%',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 70,
    marginVertical: 10,
    paddingVertical: 18,
  },
  enabled: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  disabledImage: {
    opacity: 0.2,
  },
  badgeName: {
    fontSize: 15,
    color: '#000',
    textAlign: 'center',
  },
  lockIcon: {
    top: '40%',
    left: '29%',
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Badges = () => {
  const navigation = useNavigation();
  const badges = [
    {
      name: 'Gold',
      source: require('../../assets/images/gold.png'),
      disabled: false,
    },
    {
      name: 'Silver',
      source: require('../../assets/images/silver.png'),
      disabled: true,
    },
    {
      name: 'Bronze',
      source: require('../../assets/images/bronze.png'),
      disabled: true,
    },
    {
      name: 'Diamond',
      source: require('../../assets/images/bronze.png'),
      disabled: true,
    },
  ];

  return (
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
            <View style={styles.imageContainer}>
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
            </View>
            <Text style={styles.title}>{badge.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    shadowColor: 'green',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowRadius: 10,
    borderRadius: 80,
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  enabled: {
    borderWidth: 1,
    borderColor: '#fff',
  },
  disabled: {
    opacity: 0.8,
    backgroundColor: '#f1f1f1',
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  disabledImage: {
    opacity: 0.2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lockIcon: {
    top: '50%',
    left: '40%',
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

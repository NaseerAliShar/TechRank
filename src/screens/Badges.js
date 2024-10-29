import React from 'react';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { ZoomIn, FadeIn } from 'react-native-reanimated';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

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
      <Animated.Text entering={FadeIn} style={styles.title}>
        All Badges
      </Animated.Text>
      <Animated.View entering={FadeIn} style={styles.container}>
        <View style={styles.cardContainer}>
          {badges.map((badge, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                !badge.disabled && navigation.navigate('Quiz', { badge })
              }
              disabled={badge.disabled}>
              <Animated.View entering={ZoomIn.delay(index * 100)}>
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
                    style={[
                      styles.image,
                      badge.disabled && styles.disabledImage,
                    ]}
                  />
                  <Text style={styles.badgeName}>{badge.name}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </Container>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: primaryColor,
  },
  title: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    color: primaryColor,
  },
  cardContainer: {
    margin: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '46%',
    height: '38%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    elevation: 10,
    borderRadius: 70,
    marginVertical: 10,
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
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

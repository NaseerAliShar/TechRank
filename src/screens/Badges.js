import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { width } from '../styles/sizes';
import { useNavigation } from '@react-navigation/native';
import { ZoomIn, FadeIn } from 'react-native-reanimated';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';

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

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() =>
        !item.disabled && navigation.navigate('Quiz', { badge: item })
      }
      disabled={item.disabled}>
      <Animated.View entering={ZoomIn.delay(index * 100)}>
        <View>
          {item.disabled && (
            <MaterialIcons
              name="lock"
              size={50}
              color="#000"
              style={styles.lockIcon}
            />
          )}
          <Image
            source={item.source}
            style={[styles.image, item.disabled && styles.disabledImage]}
          />
          <Text style={styles.badgeName}>{item.name}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <Animated.Text entering={FadeIn} style={styles.title}>
        All Badges
      </Animated.Text>
      <Animated.View entering={FadeIn} style={styles.container}>
        <FlatList
          data={badges}
          renderItem={renderItem}
          keyExtractor={item => item.name}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </Container>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: secondaryColor,
  },
  title: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    color: lightColor,
  },
  card: {
    margin: 5,
    borderRadius: 70,
    width: width / 2.5,
    height: width / 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  image: {
    width: width / 4,
    height: width / 4,
    resizeMode: 'contain',
  },
  disabledImage: {
    opacity: 0.2,
  },
  badgeName: {
    fontSize: 16,
    marginTop: 5,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lockIcon: {
    top: '40%',
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

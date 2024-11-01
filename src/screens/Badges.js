import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import instance from '../services/api';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { width } from '../styles/sizes';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { ZoomIn, FadeIn, FadeInRight } from 'react-native-reanimated';
import { darkColor, lightColor, primaryColor } from '../styles/colors';

const Badges = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([]);

  const fetchBadges = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('/badges');
      setBadges(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, []);

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
            source={{
              uri: `https://p3x08xsn-3000.inc1.devtunnels.ms/${item.image}`,
            }}
            style={[styles.image, item.disabled && styles.disabledImage]}
          />
          <Text style={styles.badgeName}>{item.name}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Container>
        <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={darkColor} />
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </Container>
    );
  }

  if (!loading && !badges.length) {
    return (
      <Container>
        <Animated.View entering={FadeInRight} style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No technologies found</Text>
        </Animated.View>
      </Container>
    );
  }

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
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
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
    width: width / 2.6,
    height: width / 2.6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  image: {
    width: width / 4,
    height: width / 4,
    borderRadius: 80,
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: darkColor,
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

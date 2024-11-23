import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import Header from '../components/Header';
import instance from '../services/services';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { lightColor, primaryColor } from '../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ZoomIn, FadeIn, FadeInRight } from 'react-native-reanimated';

const Badges = ({ route }) => {
  const navigation = useNavigation();
  const { technology } = route.params;
  const { _id: technologyId } = technology;
  const [achievements, setAchievements] = useState([]);
  const { badges, setBadges } = useStore(state => state);
  const { loading, setLoading } = useStore(state => state);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [badges, achievements] = await Promise.all([
        instance.get('/badges'),
        instance.get(`/achievements/${technologyId}`),
      ]);
      setBadges(badges.data);
      setAchievements(achievements.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [technologyId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toCheck = badge =>
    Array.isArray(achievements) &&
    Boolean(achievements.find(value => value.badgeId === badge._id));

  const renderItem = ({ item, index }) => {
    const isMatch = toCheck(item);
    const isAchieved = badges.some(badge => badge.isPrimary && toCheck(badge));
    const isNext = isAchieved
      ? badges.findIndex(badge => !toCheck(badge) && !badge.isPrimary)
      : -1;
    const isUnlock = index === isNext;
    const isLocked = !isMatch && !item.isPrimary && !isUnlock;

    return (
      <TouchableOpacity
        style={[styles.card, isLocked && { opacity: 0.8 }]}
        activeOpacity={0.8}
        onPress={() =>
          !isLocked && navigation.navigate('Quiz', { badge: item, technology })
        }
        disabled={isLocked}>
        <Animated.View entering={ZoomIn.delay(index * 100)}>
          <View>
            {isLocked && (
              <MaterialIcons
                name="lock"
                size={50}
                color="#000"
                style={styles.lockIcon}
              />
            )}
            {isMatch && (
              <MaterialIcons
                name="check-circle"
                size={60}
                color="green"
                style={styles.checkIcon}
              />
            )}
            <Image
              source={{
                uri: `${apiURL}/${item.icon}`,
              }}
              style={[styles.icon, isLocked && { opacity: 0.4 }]}
            />
          </View>
        </Animated.View>
        <Text style={{ color: primaryColor, fontFamily: 'Poppins-SemiBold' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <Container>
        <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={lightColor} />
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </Container>
    );
  }

  if (!loading && !badges.length) {
    return (
      <Container>
        <Header title="Badges" />
        <Animated.View entering={FadeInRight} style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No Badges found</Text>
        </Animated.View>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Badges" />
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          height: width / 4,
          marginVertical: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: lightColor,
        }}>
        <Image
          source={{
            uri: `${apiURL}/${technology.image}`,
          }}
          style={{ width: width / 6, height: width / 6, resizeMode: 'contain' }}
        />
        <Text style={{ color: primaryColor, fontFamily: 'Poppins-SemiBold' }}>
          {technology.name}
        </Text>
      </View>
      <Animated.View entering={FadeIn} style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            numColumns={2}
            data={badges}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        </View>
      </Animated.View>
    </Container>
  );
};

export default Badges;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  card: {
    margin: 5,
    width: width / 2.6,
    height: width / 2.6,
    borderRadius: width / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  icon: {
    width: width / 5,
    height: width / 5,
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
    color: lightColor,
  },
  lockIcon: {
    zIndex: 1,
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  checkIcon: {
    zIndex: 1,
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
});

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import { MaterialIcons } from '../utils/icons';
import { instance } from '../services/services';
import { navigate } from '../utils/navigation';
import { useCallback, useEffect, useState } from 'react';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';
import { Header, Loader, Container, SubContainer } from '../components/index';

const Badges = ({ route }) => {
  const { technology } = route.params;
  const { _id: technologyId } = technology;
  const [achievements, setAchievements] = useState([]);
  const { badges } = useStore(state => state);
  const { loading, setLoading } = useStore(state => state);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await instance.get(`/achievements/${technologyId}`);
      if (data?.data) {
        setAchievements(data.data);
      } else {
        console.warn('No achievements data found');
      }
    } catch (error) {
      console.error('Error fetching achievements:', error.message);
    } finally {
      setLoading(false);
    }
  }, [technologyId]);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

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
        style={[styles.card, isLocked && { opacity: 1 }]}
        activeOpacity={0.8}
        onPress={() =>
          !isLocked && navigate('Quiz', { badge: item, technology })
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
              style={[styles.icon, isLocked && { opacity: 1 }]}
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
    return <Loader />;
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
          backgroundColor: secondaryColor,
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

      {/* Badges List */}
      <SubContainer>
        {badges.length === 0 ? (
          <Text style={{ color: lightColor, fontWeight: 'Bold', margin: 10 }}>
            No Badges found
          </Text>
        ) : (
          <FlatList
            numColumns={2}
            data={badges}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        )}
      </SubContainer>
    </Container>
  );
};

export default Badges;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: width / 2.8,
    height: width / 2.8,
    borderRadius: width / 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColor,
  },
  icon: {
    width: width / 5,
    height: width / 5,
    resizeMode: 'contain',
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

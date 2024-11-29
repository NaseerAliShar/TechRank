import Svg, {
  Defs,
  Stop,
  Path,
  Circle,
  Polygon,
  LinearGradient,
} from 'react-native-svg';
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
import { useEffect, useState } from 'react';
import { replace } from '../utils/navigation';
import { instance } from '../services/services';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { lightColor, primaryColor } from '../styles/colors';
import {
  Header,
  Loader,
  Container,
  SubContainer,
  Card,
} from '../components/index';

const Badges = ({ route }) => {
  const { technology } = route.params;
  const { _id: technologyId } = technology;
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const { badges, setBadges, error, setError } = useStore();

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get(`/achievements/${technologyId}`);
      setAchievements(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (badges.length === 0) {
      setBadges();
    }
    fetchAchievements();
  }, [technologyId]);

  const toCheck = badge =>
    Array.isArray(achievements) &&
    Boolean(achievements.find(value => value.badgeId === badge._id));

  const renderItem = ({ item, index }) => {
    const badge = item;
    const isMatch = toCheck(item);
    const isAchieved = badges.some(badge => badge.isPrimary && toCheck(badge));
    const isNext = isAchieved
      ? badges.findIndex(badge => !toCheck(badge) && !badge.isPrimary)
      : -1;
    const isUnlock = index === isNext;
    const isLocked = !isMatch && !item.isPrimary && !isUnlock;
    console.log(achievements);

    return (
      <TouchableOpacity
        style={[styles.card, isLocked && { opacity: 1 }]}
        activeOpacity={0.8}
        onPress={() => !isLocked && replace('Quiz', { badge, technology })}
        disabled={isLocked}>
        <Animated.View entering={ZoomIn.delay(index * 100)}>
          <View>
            {isLocked && (
              <Svg
                style={styles.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 150 150"
                width={30}
                height={30}>
                <Defs>
                  {/* Gradient Definitions */}
                  <LinearGradient
                    id="linear-gradient"
                    x1="-68.32"
                    y1="-12.49"
                    x2="214.88"
                    y2="160.39"
                    gradientUnits="userSpaceOnUse">
                    <Stop offset="0.04" stopColor="#4907ab" />
                    <Stop offset="1" stopColor="#00eae4" />
                  </LinearGradient>
                  <LinearGradient
                    id="linear-gradient-2"
                    x1="-151.16"
                    y1="-125.32"
                    x2="165.79"
                    y2="155.42"
                    href="#linear-gradient"
                  />
                </Defs>
                {/* Main Path */}
                <Path
                  fill="url(#linear-gradient)"
                  d="M143.57,81.66a12.19,12.19,0,0,1-3.9,17.09,12.21,12.21,0,0,0-5.88,10.44,11.67,11.67,0,0,0,.1,1.56A12.21,12.21,0,0,1,123,124.46a12.2,12.2,0,0,0-10.41,8.31,12.18,12.18,0,0,1-15.8,7.6,12.32,12.32,0,0,0-4.22-.75,12.19,12.19,0,0,0-8.76,3.72,12.22,12.22,0,0,1-17.54,0,12.19,12.19,0,0,0-8.76-3.72,12.32,12.32,0,0,0-4.22.75,12.18,12.18,0,0,1-15.8-7.6A12.2,12.2,0,0,0,27,124.46a12.21,12.21,0,0,1-10.93-13.71,11.67,11.67,0,0,0,.1-1.56,12.21,12.21,0,0,0-5.88-10.44,12.19,12.19,0,0,1-3.9-17.09A12.26,12.26,0,0,0,8.4,75a12.26,12.26,0,0,0-2-6.66,12.19,12.19,0,0,1,3.9-17.09,12.21,12.21,0,0,0,5.88-10.44,11.67,11.67,0,0,0-.1-1.56A12.21,12.21,0,0,1,27,25.54a12.2,12.2,0,0,0,10.41-8.31,12.18,12.18,0,0,1,15.8-7.6,12.32,12.32,0,0,0,4.22.75,12.19,12.19,0,0,0,8.76-3.72,12.22,12.22,0,0,1,17.54,0,12.18,12.18,0,0,0,13,3,12.18,12.18,0,0,1,15.8,7.6A12.2,12.2,0,0,0,123,25.54a12.21,12.21,0,0,1,10.93,13.71,11.67,11.67,0,0,0-.1,1.56,12.21,12.21,0,0,0,5.88,10.44,12.19,12.19,0,0,1,3.9,17.09,12.24,12.24,0,0,0,0,13.32Z"
                />
                {/* Circle */}
                <Circle
                  cx="75"
                  cy="75"
                  r="55.54"
                  fill="url(#linear-gradient-2)"
                />
                {/* Black Paths */}
                <Path
                  fill="#fff"
                  d="M92.46,68.71H85.69v-10a11.48,11.48,0,0,0-23,0v10H56v-10a18.25,18.25,0,1,1,36.49,0Z"
                />
                <Path
                  fill="#fff"
                  d="M74.39,43.74a14.93,14.93,0,0,0-14.8,15V67h3.14V58.67a11.48,11.48,0,0,1,23,0V67H89.2V58.76A14.93,14.93,0,0,0,74.39,43.74Z"
                />
                <Path
                  fill="#fff"
                  d="M94.42,64.18h-40a3.17,3.17,0,0,0-3.17,3.17v35.08a3.17,3.17,0,0,0,3.17,3.17h40a3.17,3.17,0,0,0,3.17-3.17V67.35A3.17,3.17,0,0,0,94.42,64.18ZM76.87,85.4v5.51a2.46,2.46,0,1,1-4.91,0V85.4a4.84,4.84,0,1,1,4.91,0Z"
                />
                <Path
                  fill="#fff"
                  d="M97.59,102.43V67.35a3.17,3.17,0,0,0-3.17-3.17h-.34C95,72.1,96.22,97.61,75,105.6H94.42A3.17,3.17,0,0,0,97.59,102.43Z"
                />
                <Path
                  fill="#fff"
                  d="M51.24,67.35v35.08a3.17,3.17,0,0,0,3.17,3.17h.28C51.8,73.09,68,64.18,68,64.18H54.41A3.17,3.17,0,0,0,51.24,67.35Z"
                />
              </Svg>
            )}
            {isMatch && (
              <Svg
                style={styles.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 150 150"
                width={30}
                height={30}>
                <Defs>
                  <LinearGradient
                    id="linear-gradient"
                    x1="-66.06"
                    y1="-11.11"
                    x2="212.67"
                    y2="159.04"
                    gradientUnits="userSpaceOnUse">
                    <Stop offset="0.04" stopColor="#4907ab" />
                    <Stop offset="1" stopColor="#00eae4" />
                  </LinearGradient>
                  <LinearGradient
                    id="linear-gradient-2"
                    x1="-147.6"
                    y1="-122.16"
                    x2="164.36"
                    y2="154.15"
                    xlinkHref="#linear-gradient"
                  />
                </Defs>
                <Path
                  fill="url(#linear-gradient)"
                  d="M142.49,81.55a12,12,0,0,1-3.84,16.83,12,12,0,0,0-5.79,10.27,13.41,13.41,0,0,0,.1,1.54,11.67,11.67,0,0,1,.1,1.56,12,12,0,0,1-10.86,11.93A12,12,0,0,0,112,131.85a12,12,0,0,1-11.4,8.24,11.86,11.86,0,0,1-4.15-.75,12,12,0,0,0-12.78,2.92,12,12,0,0,1-17.26,0,12,12,0,0,0-12.78-2.92,11.86,11.86,0,0,1-4.15.75A12,12,0,0,1,38,131.85a12,12,0,0,0-10.24-8.17,12,12,0,0,1-10.86-11.93,11.67,11.67,0,0,1,.1-1.56,13.41,13.41,0,0,0,.1-1.54,12,12,0,0,0-5.79-10.27A12,12,0,0,1,7.51,81.55,12,12,0,0,0,9.45,75a12,12,0,0,0-1.94-6.55,12,12,0,0,1,3.84-16.83,12,12,0,0,0,5.79-10.27,13.41,13.41,0,0,0-.1-1.54,11.67,11.67,0,0,1-.1-1.56A12,12,0,0,1,27.8,26.32,12,12,0,0,0,38,18.15a12,12,0,0,1,11.4-8.24,11.86,11.86,0,0,1,4.15.75,12,12,0,0,0,4.15.74,12,12,0,0,0,8.63-3.66,12,12,0,0,1,17.26,0,12,12,0,0,0,12.78,2.92,11.86,11.86,0,0,1,4.15-.75A12,12,0,0,1,112,18.15a12,12,0,0,0,10.24,8.17,12,12,0,0,1,10.86,11.93,11.67,11.67,0,0,1-.1,1.56,13.41,13.41,0,0,0-.1,1.54,12,12,0,0,0,5.79,10.27,12,12,0,0,1,3.84,16.83,12,12,0,0,0,0,13.1Z"
                />
                <Circle
                  fill="url(#linear-gradient-2)"
                  cx="75"
                  cy="75"
                  r="54.67"
                />
                <Polygon
                  fill="#fff"
                  points="64.04 107.44 40.63 84.03 50.68 73.98 62.95 86.24 96.71 44.67 107.74 53.63 64.04 107.44"
                />
              </Svg>
            )}
            {!isLocked && !isMatch && (
              <Svg
                style={styles.svgIcon}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 150 150"
                width={30}
                height={30}>
                <Defs>
                  <LinearGradient
                    id="linear-gradient"
                    x1="-66.06"
                    y1="-11.11"
                    x2="212.67"
                    y2="159.04"
                    gradientUnits="userSpaceOnUse">
                    <Stop offset="0.04" stopColor="#4907ab" />
                    <Stop offset="1" stopColor="#00eae4" />
                  </LinearGradient>
                  <LinearGradient
                    id="linear-gradient-2"
                    x1="-147.6"
                    y1="-122.16"
                    x2="164.36"
                    y2="154.15"
                    xlinkHref="#linear-gradient"
                  />
                </Defs>
                <Path
                  d="M142.49,81.55a12,12,0,0,1-3.84,16.83,12,12,0,0,0-5.79,10.27,13.41,13.41,0,0,0,.1,1.54,11.67,11.67,0,0,1,.1,1.56,12,12,0,0,1-10.86,11.93A12,12,0,0,0,112,131.85a12,12,0,0,1-11.4,8.24,11.86,11.86,0,0,1-4.15-.75,12,12,0,0,0-12.78,2.92,12,12,0,0,1-17.26,0,12,12,0,0,0-12.78-2.92,11.86,11.86,0,0,1-4.15.75A12,12,0,0,1,38,131.85a12,12,0,0,0-10.24-8.17,12,12,0,0,1-10.86-11.93,11.67,11.67,0,0,1,.1-1.56,13.41,13.41,0,0,0,.1-1.54,12,12,0,0,0-5.79-10.27A12,12,0,0,1,7.51,81.55,12,12,0,0,0,9.45,75a12,12,0,0,0-1.94-6.55,12,12,0,0,1,3.84-16.83,12,12,0,0,0,5.79-10.27,13.41,13.41,0,0,0-.1-1.54,11.67,11.67,0,0,1-.1-1.56A12,12,0,0,1,27.8,26.32,12,12,0,0,0,38,18.15a12,12,0,0,1,11.4-8.24,11.86,11.86,0,0,1,4.15.75,12,12,0,0,0,4.15.74,12,12,0,0,0,8.63-3.66,12,12,0,0,1,17.26,0,12,12,0,0,0,12.78,2.92,11.86,11.86,0,0,1,4.15-.75A12,12,0,0,1,112,18.15a12,12,0,0,0,10.24,8.17,12,12,0,0,1,10.86,11.93,11.67,11.67,0,0,1-.1,1.56,13.41,13.41,0,0,0-.1,1.54,12,12,0,0,0,5.79,10.27,12,12,0,0,1,3.84,16.83,12,12,0,0,0,0,13.1Z"
                  fill="url(#linear-gradient)"
                />
                <Circle
                  cx="75"
                  cy="75"
                  r="54.67"
                  fill="url(#linear-gradient-2)"
                />
                <Path
                  d="M41.25,59.35A10.93,10.93,0,0,1,52,49,11.15,11.15,0,0,1,63,60.18v9.25h6.43V60.26a17.57,17.57,0,0,0-16.8-17.68A17.35,17.35,0,0,0,34.83,59.27a.62.62,0,0,0,.61.63h5.25A.56.56,0,0,0,41.25,59.35Z"
                  fill="#fff"
                />
                <Path
                  d="M52,45.73A14.17,14.17,0,0,1,66,60v7.84H63V60.18A11.15,11.15,0,0,0,52,49a10.92,10.92,0,0,0-10.7,10.32.62.62,0,0,1-.61.59H37.92A14.09,14.09,0,0,1,52,45.73Z"
                  fill="#fff"
                />
                <Path
                  d="M98.53,67.23h-38a3,3,0,0,0-3,3v33.31a3,3,0,0,0,3,3h38a3,3,0,0,0,3-3V70.23A3,3,0,0,0,98.53,67.23ZM81.86,87.37V92.6a2.33,2.33,0,1,1-4.66,0V87.37a4.59,4.59,0,1,1,4.66,0Z"
                  fill="#fff"
                />
              </Svg>
            )}
            <Image
              source={{
                uri: `${apiURL}/${item.icon}`,
              }}
              style={[styles.icon, isLocked && { opacity: 0.5 }]}
            />
          </View>
        </Animated.View>
        <Text style={{ color: primaryColor, fontFamily: 'Poppins-SemiBold' }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (loading && badges.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      <Card style={{ justifyContent: 'center' }}>
        <Image
          source={{
            uri: `${apiURL}/${technology.image}`,
          }}
          style={{
            width: width / 6,
            height: width / 6,
            resizeMode: 'contain',
          }}
        />
        <Text style={{ color: primaryColor, fontFamily: 'Poppins-Bold' , fontSize:20,}}>
          {technology.name}
        </Text>
      </Card>

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
  boxContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: primaryColor,
  },
  card: {
    margin: 10,
    width: width / 3,
    height: width / 3,
    borderRadius: width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColor,
  },
  icon: {
    width: width / 4,
    height: width / 4,
    resizeMode: 'contain',
  },
  svgIcon: {
    zIndex: 1,
    top: '100%',
    position: 'absolute',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

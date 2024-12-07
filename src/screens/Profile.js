import Svg, {
  Defs,
  Rect,
  Stop,
  Path,
  Circle,
  LinearGradient,
} from 'react-native-svg';
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Error,
  Loader,
  Gradient,
  Container,
  SubContainer,
} from '../components/index';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Fontisto } from '../utils/icons';
import { Card } from 'react-native-paper';
import { navigate } from '../utils/navigation';
import { instance } from '../services/services';
import { useUserStore } from '../store/userStore';
import { useCallback, useEffect, useState } from 'react';
import { lightColor, primaryColor } from '../styles/colors';

const Profile = () => {
  const { user, allRank, cityRank, countryRank } = useUserStore();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [achievments, setAchievements] = useState();

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await instance.get('/achievements');
      setAchievements(data.data);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const renderItem = ({ item, _ }) => (
    <View>
      <Card style={{ margin: 5, padding: 10, borderRadius: width / 2 }}>
        <Image
          source={{
            uri: `${apiURL}/${item.badgeId.icon}`,
          }}
          style={{
            top: -5,
            right: 5,
            width: width / 8,
            height: width / 8,
            resizeMode: 'contain',
          }}
        />
        <Svg
          style={{
            zIndex: 1,
            top: '100%',
            left: '110%',
            position: 'absolute',
            transform: [{ translateX: -20 }, { translateY: -20 }],
          }}
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
          </Defs>
          {/* Main Path */}
          <Path
            fill="url(#linear-gradient)"
            d="M143.57,81.66a12.19,12.19,0,0,1-3.9,17.09,12.21,12.21,0,0,0-5.88,10.44,11.67,11.67,0,0,0,.1,1.56A12.21,12.21,0,0,1,123,124.46a12.2,12.2,0,0,0-10.41,8.31,12.18,12.18,0,0,1-15.8,7.6,12.32,12.32,0,0,0-4.22-.75,12.19,12.19,0,0,0-8.76,3.72,12.22,12.22,0,0,1-17.54,0,12.19,12.19,0,0,0-8.76-3.72,12.32,12.32,0,0,0-4.22.75,12.18,12.18,0,0,1-15.8-7.6A12.2,12.2,0,0,0,27,124.46a12.21,12.21,0,0,1-10.93-13.71,11.67,11.67,0,0,0,.1-1.56,12.21,12.21,0,0,0-5.88-10.44,12.19,12.19,0,0,1-3.9-17.09A12.26,12.26,0,0,0,8.4,75a12.26,12.26,0,0,0-2-6.66,12.19,12.19,0,0,1,3.9-17.09,12.21,12.21,0,0,0,5.88-10.44,11.67,11.67,0,0,0-.1-1.56A12.21,12.21,0,0,1,27,25.54a12.2,12.2,0,0,0,10.41-8.31,12.18,12.18,0,0,1,15.8-7.6,12.32,12.32,0,0,0,4.22.75,12.19,12.19,0,0,0,8.76-3.72,12.22,12.22,0,0,1,17.54,0,12.18,12.18,0,0,0,13,3,12.18,12.18,0,0,1,15.8,7.6A12.2,12.2,0,0,0,123,25.54a12.21,12.21,0,0,1,10.93,13.71,11.67,11.67,0,0,0-.1,1.56,12.21,12.21,0,0,0,5.88,10.44,12.19,12.19,0,0,1,3.9,17.09,12.24,12.24,0,0,0,0,13.32Z"
          />
          {/* Circle */}
          <Circle cx="75" cy="75" r="55.54" fill="white" />
          {/* Technology Image */}
          <Image
            source={{
              uri: `${apiURL}/${item.technologyId.image}`,
            }}
            style={{
              top: 5,
              width: 20,
              height: 20,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
          />
        </Svg>
      </Card>
    </View>
  );

  if (loading) {
    <Loader />;
  }

  if (error) {
    <Error>{error}</Error>;
  }

  return (
    <Container>
      <View
        style={{ alignSelf: 'center', marginVertical: 10, zIndex: 1, top: 50 }}>
        <Image
          source={{
            uri: `${apiURL}/${user?.avatar}`,
          }}
          style={{
            width: width / 4,
            height: width / 4,
            borderRadius: width / 2,
          }}
        />
      </View>
      <SubContainer style={{ alignItems: 'center' }}>
        <Text style={styles.profileName}>{user?.fname}</Text>

        {/* Rank Cards */}
        <Gradient style={{ width: '100%', justifyContent: 'space-around' }}>
          {/* World Rank */}
          <View style={styles.rankCard}>
            <Fontisto name="world-o" size={28} color="white" />
            <Text style={styles.rankTitle}>World Rank</Text>
            <Text style={styles.rankNumber}>#{allRank}</Text>
          </View>

          {/* Country Rank */}
          <View style={styles.rankCard}>
            <Svg width="40" height="30" viewBox="0 0 48 32">
              <Rect width="48" height="32" fill="#01411C" />
              <Circle cx="28" cy="16" r="9" fill="#FFFFFF" />
              <Circle cx="30" cy="16" r="9" fill="#01411C" />
              <Path
                fill="#FFFFFF"
                d="M33.2 11.6l.6 1.9h2l-1.6 1.2.6 1.9-1.6-1.2-1.6 1.2.6-1.9-1.6-1.2h2z"
              />
            </Svg>
            <Text style={styles.rankTitle}>Country Rank</Text>
            <Text style={styles.rankNumber}>#{countryRank}</Text>
          </View>

          {/* City Rank */}
          <View style={styles.rankCard}>
            <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <Path
                d="M12 2C8.69 2 6 4.69 6 8C6 12.42 12 21 12 21C12 21 18 12.42 18 8C18 4.69 15.31 2 12 2Z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <Circle cx="12" cy="8" r="2" fill="black" />
            </Svg>
            {/* <Svg width="50" height="50" viewBox="0 0 150 100">
              <Path
                d="M86.69,88.27C82.45,86,79.63,88,76.59,89.84c-.88.53-2.93,0-4-.78-2-1.44-3.87-2.09-6.25-1.41-2.75.79-4.45-.24-5.88-2.82a8.21,8.21,0,0,0-4.43-3.26c-2.7-.88-4-2.16-4.08-5.14a7.5,7.5,0,0,0-2.34-4.69c-2.25-2.06-3-3.86-1.56-6.82a7.2,7.2,0,0,0-.22-5.23c-1.12-2.68-.78-4.39,1.45-6.35a8.27,8.27,0,0,0,2.33-5c.3-2.8,1.19-4.33,4.11-5.08A7.92,7.92,0,0,0,60,39.77c1.46-2.44,3-3.38,5.89-2.86a8.19,8.19,0,0,0,5.37-1.25c2.44-1.58,4.29-1.95,6.79,0a7.51,7.51,0,0,0,5.12,1.11c3-.38,4.91,0,6.37,3a7.33,7.33,0,0,0,4.21,3.11C96.6,43.73,98,45,98,48.17a7.31,7.31,0,0,0,2.42,4.64c2.21,2,2.85,3.72,1.5,6.58a7.2,7.2,0,0,0,.15,5.22c1.12,2.77,1.07,4.86-1.64,6.48-2.09,1.25-2.22,3.36-2.22,5.42,0,2.69-1.17,4.22-3.88,4.51-2.45.26-3.59,2-4.72,3.93A21.6,21.6,0,0,1,86.69,88.27Zm11-26.16A22.64,22.64,0,1,0,75.19,84.92,22.65,22.65,0,0,0,97.64,62.11Z"
                fill="#fff"
              />
              <Path
                d="M55.42,82.71c1.47,1.49,2.92,2.49,3.73,3.86,2.07,3.54,2.31,3.87,6.43,3a6.56,6.56,0,0,1,7.09,2.64L59.15,115.67c-1.41-3.19-2.7-5.82-3.73-8.54a2.61,2.61,0,0,0-3.15-1.93c-3.14.3-6.31.41-10.18.65Z"
                fill="#fff"
              />
              <Path
                d="M77.46,92.5C80,90,82.55,88.33,86.1,89.59c2.25.8,3.69-.32,4.79-2.26.88-1.54,2-3,3.43-5,4.71,8.14,9,15.51,13.59,23.52-3.72-.21-6.82-.3-9.89-.61-1.86-.19-2.88.3-3.54,2.16-.93,2.63-2.2,5.13-3.61,8.31Z"
                fill="#fff"
              />
              <Path
                d="M94.77,62.22A19.78,19.78,0,1,1,75,42.4,19.8,19.8,0,0,1,94.77,62.22ZM87.5,55.71l-3.13-3.8L71.64,65.46l-6.51-6.22-2.88,3,9.23,9.32Z"
                fill="#fff"
              />
            </Svg> */}
            <Text style={styles.rankTitle}>City Rank</Text>
            <Text style={styles.rankNumber}>#{cityRank}</Text>
          </View>
        </Gradient>

        <View>
          <Text
            style={{
              fontSize: 20,
              marginVertical: 10,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Achievements
          </Text>
          {!achievments ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ textAlign: 'justify' }}>
                You haven't earned any badge yet.
              </Text>
              <TouchableOpacity
                onPress={() => navigate('Home')}
                style={styles.button}>
                <Text
                  style={{
                    color: primaryColor,
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  Start Playing
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
              }}>
              <FlatList
                numColumns={4}
                data={achievments}
                refreshing={loading}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onRefresh={() => fetchAchievements()}
                keyExtractor={item => item._id.toString()}
                contentContainerStyle={{ alignItems: 'center' }}
              />
            </View>
          )}
        </View>
      </SubContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  profileName: {
    fontSize: 25,
    marginTop: 20,
    textAlign: 'center',
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  rankCard: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  rankTitle: {
    fontSize: 15,
    marginTop: 5,
    color: lightColor,
  },
  rankNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: lightColor,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    borderColor: primaryColor,
  },
  svgIcon: {
    zIndex: 1,
    top: '100%',
    left: '110%',
    position: 'absolute',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
});

export default Profile;

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
  const [achievements, setAchievements] = useState([]);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await instance.get('/achievements');
      setAchievements(data.data);
    } catch (error) {
      setError(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, [fetchAchievements]);

  const renderItem = ({ item }) => (
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
          style={styles.svgIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 150 150"
          width={30}
          height={30}>
          <Defs>
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
          <Path
            fill="url(#linear-gradient)"
            d="M143.57,81.66a12.19,12.19,0,0,1-3.9,17.09,12.21,12.21,0,0,0-5.88,10.44,11.67,11.67,0,0,0,.1,1.56A12.21,12.21,0,0,1,123,124.46a12.2,12.2,0,0,0-10.41,8.31,12.18,12.18,0,0,1-15.8,7.6,12.32,12.32,0,0,0-4.22-.75,12.19,12.19,0,0,0-8.76,3.72,12.22,12.22,0,0,1-17.54,0,12.19,12.19,0,0,0-8.76-3.72,12.32,12.32,0,0,0-4.22.75,12.18,12.18,0,0,1-15.8-7.6A12.2,12.2,0,0,0,27,124.46a12.21,12.21,0,0,1-10.93-13.71,11.67,11.67,0,0,0,.1-1.56,12.21,12.21,0,0,0-5.88-10.44,12.19,12.19,0,0,1-3.9-17.09A12.26,12.26,0,0,0,8.4,75a12.26,12.26,0,0,0-2-6.66,12.19,12.19,0,0,1,3.9-17.09,12.21,12.21,0,0,0,5.88-10.44,11.67,11.67,0,0,0-.1-1.56A12.21,12.21,0,0,1,27,25.54a12.2,12.2,0,0,0,10.41-8.31,12.18,12.18,0,0,1,15.8-7.6,12.32,12.32,0,0,0,4.22.75,12.19,12.19,0,0,0,8.76-3.72,12.22,12.22,0,0,1,17.54,0,12.18,12.18,0,0,0,13,3,12.18,12.18,0,0,1,15.8,7.6A12.2,12.2,0,0,0,123,25.54a12.21,12.21,0,0,1,10.93,13.71,11.67,11.67,0,0,0-.1,1.56,12.21,12.21,0,0,0,5.88,10.44,12.19,12.19,0,0,1,3.9,17.09,12.24,12.24,0,0,0,0,13.32Z"
          />
          <Circle cx="75" cy="75" r="55.54" fill="white" />
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

  if (loading) return <Loader />;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <View
        style={{ alignSelf: 'center', marginVertical: 10, zIndex: 1, top: 50 }}>
        <Image
          source={{
            uri: user?.avatar
              ? `${apiURL}/${user.avatar}`
              : `${apiURL}/profile.png`,
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
        <Gradient style={{ width: '100%', justifyContent: 'space-around' }}>
          <View style={styles.rankCard}>
            <Fontisto name="world-o" size={28} color="white" />
            <Text style={styles.rankTitle}>World Rank</Text>
            <Text style={styles.rankNumber}>#{allRank}</Text>
          </View>
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
            <Text style={styles.rankTitle}>City Rank</Text>
            <Text style={styles.rankNumber}>#{cityRank}</Text>
          </View>
        </Gradient>
        <View>
          <FlatList
            numColumns={4}
            data={achievements}
            refreshing={loading}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onRefresh={fetchAchievements}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={{ alignItems: 'center' }}
            ListHeaderComponent={
              <View>
                <Text style={styles.title}>Achievements</Text>
              </View>
            }
            ListEmptyComponent={() => (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ textAlign: 'justify' }}>
                  You haven't earned any badge yet.
                </Text>
                <TouchableOpacity
                  onPress={() => navigate('Home')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Start Playing</Text>
                </TouchableOpacity>
              </View>
            )}
          />
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
  svgIcon: {
    zIndex: 1,
    top: '100%',
    left: '110%',
    position: 'absolute',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: lightColor,
    borderRadius: 5,
  },
  buttonText: {
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  emptyList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default Profile;

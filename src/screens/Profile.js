import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import instance from '../services/services';
import Container from '../components/Container';
import { ActivityIndicator } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Svg, Rect, Path, Circle } from 'react-native-svg';
import Animated, { ZoomIn } from 'react-native-reanimated';
import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [achievments, setAchievements] = useState();
  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem('user');
        if (data) setUser(JSON.parse(data));
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    })();
  }, []);

  const fetchAchievements = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('/achievements'); // Correct endpoint spelling
      setAchievements(response.data.data); // Make sure this is the correct path
    } catch (error) {
      console.error('Error fetching achievements:', error); // Update error message
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAchievements();
  }, []);

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

  return (
    <Container>
      <View
        style={{ alignSelf: 'center', marginVertical: 10, zIndex: 1, top: 30 }}>
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
      <View style={styles.container}>
        {/* User Name */}
        <Text style={styles.profileName}>{user?.name}</Text>

        {/* Rank Cards */}
        <View style={styles.rankContainer}>
          {/* World Rank */}
          <View style={styles.rankCard}>
            <Fontisto name="world-o" size={28} color="white" />
            <Text style={styles.rankTitle}>World Rank</Text>
            <Text style={styles.rankNumber}>#102</Text>
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
            <Text style={styles.rankNumber}>#82</Text>
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
            <Text style={styles.rankTitle}>City Rank</Text>
            <Text style={styles.rankNumber}>#23</Text>
          </View>
        </View>

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <FlatList
              numColumns={4}
              data={achievments}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    margin: 5,
                    padding: 5,
                    borderRadius: 10,
                    alignItems: 'center',
                    backgroundColor: 'lemonchiffon',
                  }}>
                  <Image
                    source={{
                      uri: `${apiURL}/${item.badgeId.icon}`,
                    }}
                    style={{
                      width: width / 8,
                      height: width / 8,
                      resizeMode: 'contain',
                    }}
                  />
                  <Image
                    source={{
                      uri: `${apiURL}/${item.technologyId.image}`,
                    }}
                    style={{
                      width: width / 12,
                      height: width / 12,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              )}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item._id.toString()}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  profileName: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10,
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  rankContainer: {
    borderRadius: 10,
    height: width / 4,
    width: width / 1.2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: secondaryColor,
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
  badgeContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: secondaryColor,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  badgeText: {
    marginTop: 5,
    color: '#fff',
  },
  loadingText: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryColor,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    resizeMode: 'contain',
    borderColor: primaryColor,
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
});

export default Profile;

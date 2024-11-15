import { width } from '../styles/sizes';
import Container from '../components/Container';
import React, { useEffect, useState } from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Svg, Rect, Path, Circle } from 'react-native-svg';
import { lightColor, secondaryColor } from '../styles/colors';
import { Text, View, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <Container>
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.profileImage}
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
            <View style={styles.badgeContainer}>
              <Image
                source={require('../../assets/images/bronze.png')}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>Bronze</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Image
                source={require('../../assets/images/silver.png')}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>Silver</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Image
                source={require('../../assets/images/gold.png')}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>Gold</Text>
            </View>
            <View style={styles.badgeContainer}>
              <Image
                source={require('../../assets/images/diamond.png')}
                style={styles.badgeIcon}
              />
              <Text style={styles.badgeText}>Diamond</Text>
            </View>
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
  profileImageContainer: {
    top: 30,
    zIndex: 1,
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    backgroundColor: secondaryColor,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 25,
    marginTop: 30,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold',
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
});

export default Profile;

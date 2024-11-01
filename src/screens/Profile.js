import React, { useEffect, useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, Rect, Path, Circle } from 'react-native-svg';
import { Text, View, Image, Alert, StyleSheet } from 'react-native';

import { darkColor, lightColor, primaryColor } from '../styles/colors';
import Container from '../components/Container';

const Profile = ({ navigation }) => {
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

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('token');
            navigation.navigate('Login');
          } catch (error) {
            console.log('Failed to logout:', error);
          }
        },
      },
    ]);
  };

  return (
    <Container>
      <View style={styles.buttonContainer}>
        <Feather name="edit-3" size={24} color="white" />
        <Feather name="power" size={24} color="white" onPress={handleLogout} />
      </View>

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
              fontWeight: 'bold',
              color: '#333',
              marginTop: 20,
              textAlign: 'center',
            }}>
            Achievements
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
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
    paddingTop: 10,
    backgroundColor: lightColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  profileImageContainer: {
    top: 30,
    zIndex: 1,
    width: 90,
    height: 90,
    borderRadius: 45,
    alignSelf: 'center',
    backgroundColor: '#C4C9F2',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 25,
    marginVertical: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  rankContainer: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#978EE7',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  rankCard: {
    alignItems: 'center',
    width: 100,
    paddingVertical: 10,
  },
  rankTitle: {
    fontSize: 12,
    color: lightColor,
    marginTop: 5,
  },
  rankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightColor,
  },
  buttonContainer: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeContainer: {
    // flexDirection: 'row',
    backgroundColor: '#978EE7',
    padding: 5,
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    // justifyContent: 'space-between',
    // marginTop: 20,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    // borderRadius: 20,
    padding: 5,
    backgroundColor: '#C4C9F2',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    margin: 5,
  },
});

export default Profile;

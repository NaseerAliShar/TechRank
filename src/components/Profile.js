import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, Button } from 'react-native-paper';
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.log('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel',
        },
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
      ],
      { cancelable: false },
    );
  };

  return (
    <LinearGradient
      colors={backgroundColor}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        style={{ flex: 1 }}
        imageStyle={{ transform: [{ scale: 1.5 }] }}>
        {user && (
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.profileHeader}>
                <Image
                  source={{ uri: user.avatar }}
                  style={styles.profileImage}
                />
                <Text style={styles.name}>{user.name}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.label}>
                  Email: <Text style={styles.value}>{user.email}</Text>
                </Text>
                <Text style={styles.label}>
                  Phone:{' '}
                  <Text style={styles.value}>{user.mobile || 'N/A'}</Text>
                </Text>
              </View>
            </View>

            <View>
              <Button
                mode="contained"
                textColor="#000"
                buttonColor={primaryColor}
                style={{ margin: 10 }}
                onPress={() => console.log('Edit Profile')}>
                Edit Profile
              </Button>
              <Button
                mode="contained"
                textColor="#fff"
                buttonColor={secondaryColor}
                style={{ margin: 10 }}
                onPress={handleLogout}>
                Logout
              </Button>
            </View>
          </View>
        )}
      </ImageBackground>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    // width: '90%',
    padding: 20,
    // borderRadius: 10,
    // backgroundColor: '#fff',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: '900',
    color: primaryColor,
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    textAlign: 'center',

    fontSize: 16,
    marginBottom: 10,
    color: primaryColor,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontWeight: 'normal',
  },
});

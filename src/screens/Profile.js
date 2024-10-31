import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import Container from '../components/Container';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, Alert, StyleSheet } from 'react-native';

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
      {/* <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          textColor="#fff"
          buttonColor="green"
          style={styles.button}
          onPress={() => console.log('Edit Profile')}>
          Edit Profile
        </Button>
        <Button
          mode="contained"
          textColor="#fff"
          buttonColor="red"
          style={styles.button}
          onPress={handleLogout}>
          Logout
        </Button>
      </View> */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.container}>
        <View>
          <Text style={styles.profileName}>{user?.name}</Text>
        </View>

        <View style={styles.rankContainer}>
          <View style={styles.rankCard}>
            <Fontisto name="world-o" size={24} color="blue" />
            <Text style={{ color: lightColor }}>World Rank</Text>
            <Text style={{ color: lightColor }}>#102</Text>
          </View>
          <View style={styles.rankCard}>
            <AntDesign name="staro" size={24} color="gold" />
            <Text style={{ color: lightColor }}>Country Rank</Text>
            <Text style={{ color: lightColor }}>#82</Text>
          </View>
          <View style={styles.rankCard}>
            <Ionicons name="trophy-outline" size={24} color="purple" />
            <Text style={{ color: lightColor }}>City Rank</Text>
            <Text style={{ color: lightColor }}>#45</Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: secondaryColor,
  },
  profileImageContainer: {
    top: 30,
    zIndex: 1,
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#978EE7',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  profileName: {
    fontSize: 25,
    marginVertical: 20,
    paddingVertical: 10,
    color: darkColor,
    fontWeight: 'bold',
  },
  rankContainer: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: primaryColor,
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rankCard: {
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '40%',
    borderRadius: 20,
  },
});

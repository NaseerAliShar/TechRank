import Container from '../components/Container';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { primaryColor, secondaryColor } from '../styles/colors';
import { Text, View, Image, Alert, StyleSheet } from 'react-native';

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
    <Container>
      {user && (
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            <Image source={{ uri: user.avatar }} style={styles.profileImage} />
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.label}>
                Email: <Text style={styles.value}>{user.email}</Text>
              </Text>
              <Text style={styles.label}>
                Phone: <Text style={styles.value}>{user.mobile || 'N/A'}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              textColor={secondaryColor}
              buttonColor={primaryColor}
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
          </View>
        </View>
      )}
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: primaryColor,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  userName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: primaryColor,
  },
  infoContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: primaryColor,
    fontWeight: 'bold',
  },
  value: {
    color: '#fff',
    fontWeight: 'normal',
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '45%',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

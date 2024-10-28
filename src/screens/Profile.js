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
          <View>
            <View style={styles.profileHeader}>
              <Image
                source={{ uri: user.avatar }}
                style={styles.profileImage}
              />
              <Text style={styles.userName}>{user.name}</Text>
            </View>
            <View>
              <Text style={styles.label}>
                Email: <Text style={styles.value}>{user.email}</Text>
              </Text>
              <Text style={styles.label}>
                Phone: <Text style={styles.value}>{user.mobile || 'N/A'}</Text>
              </Text>
            </View>
          </View>

          <View>
            <Button
              mode="contained"
              textColor={secondaryColor}
              buttonColor={primaryColor}
              style={{ margin: 10 }}
              onPress={() => console.log('Edit Profile')}>
              Edit Profile
            </Button>
            <Button
              mode="contained"
              textColor="#fff"
              buttonColor="red"
              style={{ margin: 10 }}
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
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor,
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  value: {
    color: '#fff',
    fontWeight: 'normal',
  },
});

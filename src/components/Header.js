import { useEffect, useState } from 'react';
import { black, white, primary } from '../styles/colors';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = () => {
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

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.greeting}>
        Hello, <Text style={styles.userName}>{user.name}</Text>
      </Text>
      <Image
        source={require('../../assets/images/silver.png')}
        style={styles.badge}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    elevation: 5,
    shadowRadius: 2,
    borderRadius: 10,
    shadowOpacity: 0.8,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: white,
    justifyContent: 'space-between',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  greeting: {
    fontSize: 18,
    color: black,
    fontWeight: 'bold',
  },
  userName: {
    color: primary,
  },
  badge: {
    width: 30,
    height: 30,
    marginTop: 5,
    resizeMode: 'contain',
  },
});

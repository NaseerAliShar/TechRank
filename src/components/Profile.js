import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card, Button} from 'react-native-paper';

const Profile = () => {
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

  return (
    <View style={styles.container}>
      {user && (
        <Card style={styles.card}>
          <View style={styles.profileHeader}>
            <Image source={{uri: user.avatar}} style={styles.profileImage} />
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.label}>
              Email: <Text style={styles.value}>{user.email}</Text>
            </Text>
            <Text style={styles.label}>
              Phone: <Text style={styles.value}>{user.mobile || 'N/A'}</Text>
            </Text>
            <Text style={styles.label}>
              Role: <Text style={styles.value}>{user.role || 'N/A'}</Text>
            </Text>
          </View>
          <Button
            mode="contained"
            style={styles.editButton}
            onPress={() => console.log('Edit Profile')}>
            Edit Profile
          </Button>
        </Card>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {width: 0, height: 2},
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    fontWeight: '600',
  },
  value: {
    color: '#777',
    fontWeight: 'normal',
  },
  editButton: {
    backgroundColor: '#6200ea',
    borderRadius: 5,
  },
});

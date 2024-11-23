import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  ZoomIn,
  BounceIn,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import instance from '../services/services';
import Container from '../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';

const Home = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const { loading, setLoading } = useStore(state => state);
  const { technologies, setTechnologies } = useStore(state => state);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    })();
  }, []);

  const fetchTechnologies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('/technologies');
      setTechnologies(response.data);
    } catch (error) {
      console.error('Error fetching technologies:', error);
    } finally {
      setLoading(false);
    }
  }, [setTechnologies]);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Badges', { technology: item })}>
      <View style={{ alignItems: 'center' }}>
        <Animated.View
          entering={BounceIn.delay(index * 100)}
          exiting={FadeOutDown}
          style={styles.card}>
          <Image
            source={{ uri: `${apiURL}/${item.image}` }}
            style={styles.icon}
          />
        </Animated.View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

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
  console.log(user);

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome, {user?.fname}</Text>
        <Image
          source={require('../../assets/images/logo1.png')}
          style={styles.logo}
        />
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: `${apiURL}/${user?.avatar}` }}
          style={styles.userAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>Hello, {user?.fname}</Text>
          <View style={styles.greetingContainer}>
            <Feather name="sun" size={15} color="orange" />
            <Text style={styles.greetingText}>Good Morning</Text>
          </View>
          <View style={styles.userStats}>
            {[
              { icon: 'trophy', value: user?.weightage },
              { icon: 'badge', value: 50 },
              { icon: 'star', value: 50 },
            ].map((stat, idx) => (
              <View key={idx} style={styles.statBadge}>
                <SimpleLineIcons name={stat.icon} size={15} color="white" />
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* "Did You Know" Section */}
      <View style={styles.didYouKnow}>
        <Animated.View style={{ marginRight: 10 }} entering={ZoomIn}>
          <Image
            source={require('../../assets/images/didyouknow.png')}
            style={styles.didYouKnowIcon}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp}>
          <Text style={styles.didYouKnowText}>
            JavaScript has a built-in function to randomly shuffle items in an
            array, helping you mix things up with ease.
          </Text>
        </Animated.View>
      </View>

      {/* Technologies List */}
      <View style={styles.container}>
        {technologies.length === 0 ? (
          <Text style={styles.loadingText}>No Technologies found</Text>
        ) : (
          <FlatList
            numColumns={4}
            data={technologies}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  welcomeText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
  },
  logo: {
    width: width / 8,
    height: width / 8,
    resizeMode: 'contain',
  },
  userInfo: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: lightColor,
  },
  userAvatar: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 3,
  },
  userName: {
    color: primaryColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  greetingContainer: {
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  greetingText: {
    fontSize: 15,
    marginLeft: 5,
    color: primaryColor,
  },
  userStats: {
    gap: 5,
    flexDirection: 'row',
  },
  statBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: secondaryColor,
  },
  statValue: {
    color: '#fff',
    marginLeft: 5,
  },
  didYouKnow: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: lightColor,
  },
  didYouKnowIcon: {
    width: width / 5,
    height: width / 5,
    resizeMode: 'contain',
  },
  didYouKnowText: {
    color: primaryColor,
    textAlign: 'justify',
    maxWidth: width / 1.5,
    fontFamily: 'Poppins-Regular',
  },
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  card: {
    margin: 10,
    width: width / 6,
    height: width / 6,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  icon: {
    width: width / 7,
    height: width / 7,
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: lightColor,
  },
});

export default Home;

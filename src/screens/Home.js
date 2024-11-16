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
  FadeInUp,
  BounceIn,
  FadeInRight,
  FadeOutDown,
  ZoomInRotate,
} from 'react-native-reanimated';
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import instance from '../services/services';
import Container from '../components/Container';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState, useCallback } from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [technologies, setTechnologies] = useState([]);

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
  }, []);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Badges')}>
      <Animated.View
        entering={BounceIn.delay(index * 100)}
        exiting={FadeOutDown}
        style={styles.card}>
        <Image
          source={{
            uri: `${apiURL}/${item.image}`,
          }}
          style={styles.icon}
        />
      </Animated.View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <Container>
        <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={darkColor} />
          <Text style={styles.loadingText}>Loading...</Text>
        </Animated.View>
      </Container>
    );
  }

  if (!loading && !technologies.length) {
    return (
      <Container>
        <Animated.View entering={FadeInRight} style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No technologies found</Text>
        </Animated.View>
      </Container>
    );
  }

  return (
    <Container>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          height: width / 4,
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: lightColor,
        }}>
        <Image
          source={{
            uri: 'https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png',
          }}
          style={styles.profileImage}
        />
        <View style={{ left: 15 }}>
          <Text
            style={{ color: primaryColor, fontSize: 20, fontWeight: 'bold' }}>
            Hello, Naseer
          </Text>
          <View
            style={{
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Feather name="sun" size={15} color="orange" />
            <Text style={{ color: primaryColor, fontSize: 15, left: 5 }}>
              Good Morning
            </Text>
          </View>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <View
              style={{
                columnGap: 5,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: secondaryColor,
              }}>
              <SimpleLineIcons name="trophy" size={15} color="white" />
              <Text style={{ color: '#fff' }}>50</Text>
            </View>
            <View
              style={{
                columnGap: 5,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: secondaryColor,
              }}>
              <SimpleLineIcons name="badge" size={15} color="white" />
              <Text style={{ color: '#fff' }}>50</Text>
            </View>
            <View
              style={{
                columnGap: 5,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: secondaryColor,
              }}>
              <MaterialCommunityIcons
                name="crown-outline"
                size={15}
                color="white"
              />
              <Text style={{ color: '#fff' }}>50</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: lightColor,
        }}>
        <Animated.View style={[{ marginRight: 10 }]} entering={ZoomInRotate}>
          <Image
            source={require('../../assets/images/didyouknow.png')}
            style={{
              width: width / 5,
              height: width / 5,
              resizeMode: 'contain',
            }}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp}>
          <Text
            style={{
              color: primaryColor,
              fontFamily: 'Poppins-Regular',
              maxWidth: '85%',
            }}>
            JavaScript has a built-in function to randomly shuffle items in an
            array, helping you mix things up with ease.
          </Text>
        </Animated.View>
      </View>
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            numColumns={4}
            data={technologies}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id.toString()}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  card: {
    margin: 5,
    width: width / 5.6,
    height: width / 5.6,
    borderRadius: width / 2.8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  icon: {
    width: width / 6,
    height: width / 6,
    resizeMode: 'contain',
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
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 30,
    resizeMode: 'contain',
    borderColor: primaryColor,
  },
});

export default Home;

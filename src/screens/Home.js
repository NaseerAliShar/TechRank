import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  ZoomIn,
  BounceIn,
  FadeInRight,
  FadeOutDown,
} from 'react-native-reanimated';
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import { width } from '../styles/sizes';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import instance from '../services/api';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
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
        entering={BounceIn.delay(index * 150)}
        exiting={FadeOutDown}
        style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
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
          backgroundColor: secondaryColor,
          padding: 20,
          width: '100%',
          borderRadius: 20,
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={{
            uri: 'https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png',
          }}
          style={styles.profileImageTop}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>
            Hello, Naseer
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 2,
              paddingBottom: 5,
            }}>
            <Feather name="sun" size={17} color="orange" />
            <Text style={{ color: 'yellow', fontSize: 15 }}>Good Morning</Text>
          </View>
          <View style={{ flexDirection: 'row', columnGap: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 4,
                alignItems: 'center',
                backgroundColor: primaryColor,
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 15,
              }}>
              <SimpleLineIcons name="trophy" size={18} color="white" />
              <Text style={{ fontSize: 16, color: '#fff' }}>50</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 4,
                alignItems: 'center',
                backgroundColor: primaryColor,
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 15,
              }}>
              <SimpleLineIcons name="badge" size={18} color="white" />
              <Text style={{ fontSize: 16, color: '#fff' }}>50</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                columnGap: 4,
                alignItems: 'center',
                backgroundColor: primaryColor,
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRadius: 15,
              }}>
              <MaterialCommunityIcons
                name="crown-outline"
                size={18}
                color="white"
              />
              <Text style={{ fontSize: 16, color: '#fff' }}>50</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ justifyContent: 'space-between' }}>
          <FlatList
            data={technologies}
            numColumns={4}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  card: {
    margin: 5,
    borderRadius: 40,
    width: width / 5.5,
    height: width / 5.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  image: {
    width: width / 6,
    height: width / 6,
    borderRadius: 40,
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
    color: darkColor,
  },
  profileImageTop: {
    width: 80,
    height: 80,
    borderRadius: 30,
    resizeMode: 'contain',
    borderColor: primaryColor,
  },
});

export default Home;

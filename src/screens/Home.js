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
import instance from '../services/api';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import { width } from '../styles/sizes';
import { useNavigation } from '@react-navigation/native';
import { darkColor, lightColor } from '../styles/colors';
import { useEffect, useState, useCallback } from 'react';

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
      <Animated.Text entering={FadeInRight} style={styles.title}>
        All Technologies
      </Animated.Text>
      <View style={styles.container}>
        <FlatList
          data={technologies}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
        />
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
  title: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    color: lightColor,
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
});

export default Home;

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
  FadeInRight,
  FadeOutDown,
} from 'react-native-reanimated';
import { width } from '../styles/sizes';
import { primaryColor } from '../styles/colors';
import instance from '../services/api';
import Container from '../components/Container';
import React, { useEffect, useState, useCallback } from 'react';

const Home = ({ navigation }) => {
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
          <ActivityIndicator size={50} color={primaryColor} />
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
          columnWrapperStyle={styles.cardContainer}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: primaryColor,
  },
  title: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
    color: primaryColor,
  },
  cardContainer: {
    margin: 10,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    borderRadius: 50,
    marginHorizontal: 5,
    width: (width - 40) / 5,
    height: (width - 40) / 5,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
    borderRadius: 50,
    resizeMode: 'contain',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

export default Home;

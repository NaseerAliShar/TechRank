import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { width } from '../styles/sizes';
import {
  primaryColor,
  secondaryColor,
  backgroundColor,
} from '../styles/colors';
import instance from '../services/api';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useState, useCallback } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const Technologies = ({ navigation }) => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTechnologies = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('/technologies');
      setTechnologies(response.data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Badges', { quizId: item._id })}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center' }}>
            <Image source={{ uri: item.image }} style={styles.image} />
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color="blue" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!loading && !technologies.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No technologies found</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={backgroundColor} style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={{ transform: [{ scale: 1.5 }] }}
        style={styles.container}>
        <Text style={styles.title}>All Technologies</Text>
        <FlatList
          data={technologies}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.cardContainer}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: secondaryColor,
  },
  columnWrapper: {
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 10,
    fontSize: 20,
    color: primaryColor,
    textAlign: 'center',
  },
  card: {
    margin: 5,
    borderRadius: 50,
    width: (width - 40) / 5,
    height: (width - 40) / 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    borderRadius: 50,
    width: (width - 40) / 5,
    height: (width - 40) / 5,
    resizeMode: 'contain',
  },
});

export default Technologies;

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
import instance from '../services/api';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect, useState, useCallback } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { width } from '../styles/sizes';
import { backgroundColor, primaryColor, secondaryColor } from '../styles/colors';

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
    <LinearGradient colors={backgroundColor} style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={{ transform: [{ scale: 1.5 }] }}
        style={{ flex: 1 }}>
        <Text style={styles.title}>All Technologies</Text>
        <FlatList
          data={technologies}
          numColumns={4}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.container}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    backgroundColor: secondaryColor,
    padding: 10,
    margin: 10,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: '100%',
  },
  columnWrapper: {
    marginBottom: 10,
    justifyContent: 'space-evenly',
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
    width: (width - 40) / 4.5,
    height: (width - 40) / 4.5,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    borderRadius: 50,
    width: (width - 40) / 5,
    height: (width - 40) / 5,
    resizeMode: 'contain',
  },
});

export default Technologies;

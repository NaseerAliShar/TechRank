import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { width } from '../styles/sizes';
import {
  backgroundColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import instance from '../services/api';
import Container from '../components/Container';
import React, { useEffect, useState, useCallback } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const Technologies = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [technologies, setTechnologies] = useState([]);

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
      onPress={() => navigation.navigate('Badges')}>
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
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={50} color={primaryColor} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Container>
    );
  }

  if (!loading && !technologies.length) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No technologies found</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <Text style={styles.title}>All Technologies</Text>
      <FlatList
        data={technologies}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.cards}
        contentContainerStyle={styles.container}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: primaryColor,
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
    color: primaryColor,
  },
  cards: {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
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
    width: '100%',
    height: '100%',
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

export default Technologies;

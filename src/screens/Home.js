import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import instance from '../services/api';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { width } from '../styles/sizes';
import { Card } from 'react-native-paper';
import { black, white, primary } from '../styles/colors';

const Exams = ({ navigation }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getExams = async () => {
      try {
        const response = await instance.get('/quizzes');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };
    getExams();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Quiz', { quizId: item._id })}>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Card style={styles.card}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: item.technology.image }}
              style={styles.image}
            />
          </View>
        </Card>
      </Animated.View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!exams.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No exams found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <Text style={styles.title}>All Exams</Text>
      <FlatList
        data={exams}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    color: black,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: primary,
  },
  flatListContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  card: {
    margin: 8,
    borderRadius: 50,
    width: width * 0.2,
    height: width * 0.2,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    borderRadius: 50,
    width: width * 0.15,
    height: width * 0.15,
    resizeMode: 'cover',
  },
});

export default Exams;

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import instance from '../services/api';
import React, { useEffect, useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { width } from '../styles/sizes';

const Exams = ({ navigation }) => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
 const getExams = async () => {
      try {
        const response = await instance.get('/technologies');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
   
    getExams();
  }, [exams]);

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
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!exams.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No technologies found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Technologies</Text>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getExams()}          />
        }
        data={exams}
        numColumns={4}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  columnWrapper: {
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 10,
    fontSize: 20,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
    color: 'blue',
  },
  card: {
    borderRadius: 50,
    width: (width - 40) / 4.5,
    height: (width - 40) / 4.5,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
  },
  image: {
    borderRadius: 50,
    width: (width - 40) / 5,
    height: (width - 40) / 5,
    resizeMode: 'contain',
  },
});

export default Exams;

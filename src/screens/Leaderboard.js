import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Card} from 'react-native-paper';
import Animated, {FadeInUp} from 'react-native-reanimated';

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating an API call
    setTimeout(() => {
      const mockData = [
        {
          id: '1',
          name: 'Alice',
          score: 95,
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
          id: '2',
          name: 'Bob',
          score: 89,
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
          id: '3',
          name: 'Charlie',
          score: 85,
          avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
        },
        {
          id: '4',
          name: 'Diana',
          score: 80,
          avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
        },
        {
          id: '5',
          name: 'Edward',
          score: 78,
          avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
        },
      ];
      setUsers(mockData);
      setLoading(false);
    }, 2000); // Simulated delay
  }, []);

  const renderItem = ({item, index}) => (
    <Animated.View entering={FadeInUp.delay(index * 100)}>
      <Card style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.rank}>{index + 1}</Text>
          <Image source={{uri: item.avatar}} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.score}>{item.score} pts</Text>
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    width: 40,
    textAlign: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  score: {
    fontSize: 16,
    color: '#888',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f9',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default Leaderboard;

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
import { apiURL } from '../config/config';
import Header from '../components/Header';
import instance from '../services/services';
import Animated from 'react-native-reanimated';
import Container from '../components/Container';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { darkColor, lightColor } from '../styles/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ZoomIn, FadeIn, FadeInRight } from 'react-native-reanimated';

const Badges = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([]);

  const fetchBadges = useCallback(async () => {
    setLoading(true);
    try {
      const response = await instance.get('/badges');
      setBadges(response.data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBadges();
  }, []);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => true && navigation.navigate('Quiz')}
      disabled={false}>
      <Animated.View entering={ZoomIn.delay(index * 100)}>
        <View>
          {true && (
            <MaterialIcons
              name="lock"
              size={60}
              color="#000"
              style={styles.lockIcon}
            />
          )}
          <Image
            source={{
              uri: `${apiURL}/${item.image}`,
            }}
            style={[styles.icon, true && { opacity: 0.2 }]}
          />
        </View>
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

  if (!loading && !badges.length) {
    return (
      <Container>
        <Header title="Badges" />
        <Animated.View entering={FadeInRight} style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No Badges found</Text>
        </Animated.View>
      </Container>
    );
  }

  return (
    <Container>
      <Header title="Badges" />
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          height: width / 4,
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: lightColor,
        }}></View>
      <Animated.View entering={FadeIn} style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <FlatList
            numColumns={2}
            data={badges}
            renderItem={renderItem}
            keyExtractor={item => item.name}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </Animated.View>
    </Container>
  );
};

export default Badges;

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
    width: width / 2.6,
    height: width / 2.6,
    borderRadius: width / 1.3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lemonchiffon',
  },
  icon: {
    width: width / 4,
    height: width / 4,
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
  lockIcon: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
});

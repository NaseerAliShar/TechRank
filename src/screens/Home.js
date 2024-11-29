import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  BounceIn,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import { navigate } from '../utils/navigation';
import { Feather, SimpleLineIcons } from '../utils/icons';
import { lightColor, primaryColor } from '../styles/colors';
import {
  Card,
  Error,
  Loader,
  Container,
  SubContainer,
} from '../components/index';

const Home = () => {
  const {
    user,
    setUser,
    error,
    loading,
    badges,
    setBadges,
    technologies,
    setTechnologies,
  } = useStore();

  useEffect(() => {
    if (technologies.length === 0) {
      setTechnologies();
    }
    if (badges.length === 0) {
      setBadges();
    }
    setUser();
  }, [user]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigate('Badges', { technology: item })}>
      <View style={{ alignItems: 'center' }}>
        <Animated.View
          entering={BounceIn.delay(index * 100)}
          exiting={FadeOutDown}
          style={styles.card}>
          <Image
            source={{ uri: `${apiURL}/${item.image}` }}
            style={styles.icon}
          />
        </Animated.View>
        <Text style={{ color: lightColor }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && technologies.length === 0) {
    return <Loader />;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  return (
    <Container>
      {/* User Info */}
      <Card>
        <Image
          source={{ uri: `${apiURL}/${user?.avatar}` }}
          style={styles.userAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>Hello, {user?.fname}</Text>
          <View style={styles.greetingContainer}>
            <Feather name="sun" size={15} color="orange" />
            <Text style={{ color: lightColor, marginLeft: 5 }}>
              Good Morning
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {[
              { icon: 'trophy', value: user?.weightage },
              { icon: 'badge', value: 50 },
              { icon: 'star', value: 50 },
            ].map((stat, idx) => (
              <View key={idx} style={styles.statBadge}>
                <SimpleLineIcons name={stat.icon} size={15} color="white" />
                <Text style={{ color: lightColor, marginLeft: 5 }}>
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </Card>

      {/* "Did You Know" Section */}
      <Card>
        <Animated.View entering={FadeInUp}>
          <Text style={styles.didYouKnowText}>Here is Tip of the day!</Text>
        </Animated.View>
      </Card>

      {/* Technologies List */}
      <SubContainer>
        <View style={{ alignItems: 'center' }}>
          {technologies.length === 0 ? (
            <Text style={{ color: lightColor, fontWeight: 'bold', margin: 10 }}>
              No Technologies found
            </Text>
          ) : (
            <FlatList
              numColumns={4}
              data={technologies}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item._id.toString()}
              contentContainerStyle={{ alignItems: 'flex-start' }}
            />
          )}
        </View>
      </SubContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  userAvatar: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightColor,
  },
  greetingContainer: {
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  statBadge: {
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: primaryColor,
  },
  didYouKnowText: {
    color: primaryColor,
    textAlign: 'justify',
    fontFamily: 'Poppins-Regular',
  },
  card: {
    margin: 10,
    width: width / 6,
    height: width / 6,
    borderRadius: width / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightColor,
  },
  icon: {
    width: width / 7,
    height: width / 7,
    resizeMode: 'contain',
  },
});

export default Home;

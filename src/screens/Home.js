import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  ZoomIn,
  BounceIn,
  FadeInUp,
  FadeOutDown,
} from 'react-native-reanimated';
import React from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import { navigate } from '../utils/navigation';
import { instance } from '../services/services';
import { Feather, SimpleLineIcons } from '../utils/icons';
import { lightColor, primaryColor } from '../styles/colors';
import { Loader, Container, SubContainer } from '../components/index';

const Home = () => {
  const {
    user,
    setUser,
    loading,
    setLoading,
    setBadges,
    technologies,
    setTechnologies,
  } = useStore(state => state);

  const setData = React.useCallback(async () => {
    setLoading(true);
    try {
      const [technologies, badges] = await Promise.all([
        instance.get('/technologies'),
        instance.get('/badges'),
      ]);
      setTechnologies(technologies.data);
      setBadges(badges.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [setTechnologies, setBadges]);

  React.useEffect(() => {
    setUser();
    setData();
  }, [setUser, setData]);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome, {user?.fname} {user?.lname}
        </Text>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Image
          source={{ uri: `${apiURL}/${user?.avatar}` }}
          style={styles.userAvatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.userName}>Hello, {user?.fname}</Text>
          <View style={styles.greetingContainer}>
            <Feather name="sun" size={15} color="orange" />
            <Text style={{ color: primaryColor, marginLeft: 5 }}>
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
      </View>

      {/* "Did You Know" Section */}
      <View style={styles.didYouKnow}>
        <Animated.View style={{ marginRight: 10 }} entering={ZoomIn}>
          <Image
            source={require('../../assets/images/didyouknow.png')}
            style={styles.didYouKnowIcon}
          />
        </Animated.View>
        <Animated.View entering={FadeInUp}>
          <Text style={styles.didYouKnowText}>
            JavaScript has a built-in function to randomly shuffle items in an
            array, helping you mix things up with ease.
          </Text>
        </Animated.View>
      </View>

      {/* Technologies List */}
      <SubContainer>
        {technologies.length === 0 ? (
          <Text style={{ color: lightColor, fontWeight: 'Bold', margin: 10 }}>
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
      </SubContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
  logo: {
    width: width / 8,
    height: width / 8,
    resizeMode: 'contain',
  },
  userInfo: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: primaryColor,
  },
  userAvatar: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  greetingContainer: {
    paddingVertical: 5,
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
  didYouKnow: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: primaryColor,
  },
  didYouKnowIcon: {
    width: width / 5,
    height: width / 5,
    resizeMode: 'contain',
  },
  didYouKnowText: {
    color: primaryColor,
    textAlign: 'justify',
    maxWidth: width / 1.5,
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

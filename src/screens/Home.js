import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Error,
  Loader,
  Gradient,
  NotFound,
  Container,
  SubContainer,
} from '../components/index';
import { useEffect } from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Card } from 'react-native-paper';
import { navigate } from '../utils/navigation';
import { useUserStore } from '../store/userStore';
import { useBadgeStore } from '../store/badgeStore';
import { Feather, SimpleLineIcons } from '../utils/icons';
import { lightColor, primaryColor } from '../styles/colors';
import { useTechnologyStore } from '../store/technologyStore';
import Animated, { FadeInLeft, FadeOutDown } from 'react-native-reanimated';

const Home = () => {
  const { fetchBadges } = useBadgeStore();
  const { fetchData, user, allRank, achievements, tip } = useUserStore();
  const { technologies, loading, error, fetchTechnologies } =
    useTechnologyStore();

  useEffect(() => {
    fetchData();
    fetchBadges();
    fetchTechnologies();
  }, [fetchData, fetchBadges, fetchTechnologies]);

  const renderItem = ({ item, _ }) => (
    <Gradient style={{ margin: 10 }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigate('Badges', { technology: item })}>
        <View style={{ alignItems: 'center' }}>
          <Animated.View
            entering={FadeInLeft}
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
    </Gradient>
  );

  if (loading) return <Loader />;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      {/* User Info */}
      <Gradient>
        <Image
          source={{
            uri: user?.avatar
              ? `${apiURL}/${user.avatar}`
              : `${apiURL}/profile.png`,
          }}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>Hello, {user?.fname}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="sun" size={16} color="orange" />
            <Text style={styles.text}>Good Morning</Text>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            {[
              { icon: 'trophy', value: user?.weightage || 0 },
              { icon: 'badge', value: achievements },
              { icon: 'star', value: allRank },
            ].map((stat, idx) => (
              <View key={idx} style={styles.stats}>
                <SimpleLineIcons name={stat.icon} size={16} color="white" />
                <Text style={styles.text}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </Gradient>

      {/* Did You Know Tip */}
      <Card style={{ padding: 15 }}>
        <Text
          style={{
            color: primaryColor,
            textAlign: 'center',
            fontFamily: 'Poppins-SemiBold',
          }}>
          Tip of the Day!
        </Text>
        <Text style={{ textAlign: 'justify' }}>{tip}</Text>
      </Card>

      {/* Technologies List */}
      <SubContainer>
        <FlatList
          numColumns={3}
          data={technologies}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          refreshing={loading}
          onRefresh={() => fetchTechnologies()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center' }}
          ListEmptyComponent={<NotFound>No Technologies found</NotFound>}
          ListHeaderComponent={
            <View>
              <NotFound>Technologies</NotFound>
            </View>
          }
        />
      </SubContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: width / 6,
    height: width / 6,
    borderRadius: width / 12,
  },
  name: {
    fontSize: 18,
    color: lightColor,
    fontFamily: 'Poppins-SemiBold',
  },
  stats: {
    marginRight: 10,
    borderRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: primaryColor,
  },
  text: {
    marginLeft: 5,
    color: lightColor,
  },
  card: {
    marginBottom: 10,
    width: width / 5,
    height: width / 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width / 2.5,
    backgroundColor: lightColor,
  },
  icon: {
    width: width / 6,
    height: width / 6,
    resizeMode: 'contain',
  },
});

export default Home;

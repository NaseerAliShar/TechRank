import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
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
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Card } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { useBadgeStore } from '../store/badgeStore';
import { useLeaderboardStore } from '../store/usersStore';
import { useTechnologyStore } from '../store/technologyStore';
import { SelectList } from 'react-native-dropdown-select-list';
import { darkColor, lightColor, primaryColor } from '../styles/colors';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const { badges } = useBadgeStore();
  const { technologies } = useTechnologyStore();
  const { users, error, loading, fetchData, clearCache } =
    useLeaderboardStore();

  useEffect(() => {
    fetchData(activeTab, selectedBadge, selectedTechnology);
  }, [activeTab, selectedBadge, selectedTechnology]);

  useEffect(() => {
    setSelectedBadge('');
    setSelectedTechnology('');
  }, [activeTab]);
  const renderItem = ({ item, index }) => (
    <Card style={{ marginBottom: 5 }}>
      <View style={styles.itemContainer}>
        <Gradient style={{ paddingVertical: 4, borderRadius: 20 }}>
          <Text style={styles.indexText}>{index + 4}</Text>
        </Gradient>
        <View style={styles.userInfo}>
          <Image
            source={{
              uri: item.avatar
                ? `${apiURL}/${item.avatar}`
                : `${apiURL}/user.png`,
            }}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.userName}>{item.fname}</Text>
            <Text style={styles.userDetails}>
              {`${item.country || 'NA'}, ${item.city || 'NA'}`}
            </Text>
          </View>
        </View>
        <Text style={styles.userName}>{item.weightage}</Text>
      </View>
    </Card>
  );

  if (loading) return <Loader />;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <View>
        <ScrollView
          contentContainerStyle={{ flexDirection: 'row' }}
          showsHorizontalScrollIndicator={false}
          horizontal={true}>
          {['All', 'Country', 'City', 'Badge', 'Technology'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabTitle,
                activeTab === tab ? styles.active : styles.inactive,
              ]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}>
              <Text
                style={
                  activeTab === tab ? styles.activeText : styles.inactiveText
                }>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {activeTab === 'Badge' && (
          <SelectList
            setSelected={setSelectedBadge}
            inputStyles={{ color: primaryColor }}
            dropdownTextStyles={{ color: primaryColor }}
            boxStyles={{
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: lightColor,
            }}
            dropdownStyles={{
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: lightColor,
            }}
            data={badges.map(badge => ({ key: badge._id, value: badge.name }))}
            save="key"
          />
        )}

        {activeTab === 'Technology' && (
          <SelectList
            setSelected={setSelectedTechnology}
            inputStyles={{ color: primaryColor }}
            dropdownTextStyles={{ color: primaryColor }}
            boxStyles={{
              marginTop: 10,
              marginHorizontal: 10,
              backgroundColor: lightColor,
            }}
            dropdownStyles={{
              marginHorizontal: 10,
              backgroundColor: lightColor,
            }}
            data={technologies.map(technology => ({
              key: technology._id,
              value: technology.name,
            }))}
            save="key"
          />
        )}

        {/* Top 3 Users */}
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            <View
              style={{
                marginBottom: 5,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {['1', '0', '2'].map(index => (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    top: index === '0' ? 5 : index === '1' ? 35 : 55,
                  }}>
                  <Image
                    source={{
                      uri: users[index]?.avatar
                        ? `${apiURL}/${users[index]?.avatar}`
                        : 'https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png',
                    }}
                    style={styles.profileImageTop}
                  />
                  <Text style={styles.inactiveText}>{users[index]?.fname}</Text>
                  <View style={styles.rankText}>
                    <Text style={[styles.inactiveText, { color: lightColor }]}>
                      {users[index]?.achievements ||
                        users[index]?.weightage ||
                        0}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
          <Image
            source={require('../../assets/images/boxes.png')}
            style={{ width: width, height: width / 2.5, resizeMode: 'contain' }}
          />
        </View>
      </View>
      <SubContainer style={{ alignItems: 'center' }}>
        <FlatList
          data={users.slice(3)}
          refreshing={loading}
          renderItem={renderItem}
          keyExtractor={item => item.email}
          onRefresh={() => {
            clearCache();
            fetchData(activeTab);
          }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<NotFound>No Users found</NotFound>}
        />
      </SubContainer>
    </Container>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  tabTitle: {
    marginLeft: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  itemContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  active: {
    backgroundColor: primaryColor,
  },
  inactive: {
    backgroundColor: lightColor,
  },
  activeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightColor,
  },
  inactiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  userInfo: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: 5,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  profileImageTop: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    borderColor: primaryColor,
  },
  indexText: {
    fontSize: 16,
    color: lightColor,
  },
  rankText: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
  },
  userName: {
    fontWeight: 'bold',
    color: primaryColor,
  },
  userDetails: {
    fontSize: 12,
    color: darkColor,
  },
});

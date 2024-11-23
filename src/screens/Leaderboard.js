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
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { useStore } from '../store/store';
import instance from '../services/services';
import Container from '../components/Container';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { SelectList } from 'react-native-dropdown-select-list';
import React, { useState, useEffect, useCallback } from 'react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [selectedTechnology, setSelectedTechnology] = useState('');
  const { users, setUsers } = useStore(state => state);
  const { loading, setLoading } = useStore(state => state);
  const { badges, technologies } = useStore(state => state);

  const fetchLeaderboardData = useCallback(async () => {
    setLoading(true);
    let endpoint = '';

    switch (activeTab) {
      case 'All':
        endpoint = '/leaderboard/allUsers';
        break;
      case 'Country':
        endpoint = '/leaderboard/byCountry';
        break;
      case 'City':
        endpoint = '/leaderboard/byCity';
        break;
      case 'Badge':
        endpoint = selectedBadge
          ? `leaderboard/byBadge/${selectedBadge}`
          : '/leaderboard/allUsers';
        break;
      case 'Technology':
        endpoint = selectedTechnology
          ? `leaderboard/byTechnology/${selectedTechnology}`
          : '/leaderboard/allUsers';
        break;
      default:
        setLoading(false);
        return;
    }

    try {
      const response = await instance.get(endpoint);
      setUsers(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, selectedBadge, selectedTechnology, setLoading]);

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  useEffect(() => {
    setSelectedBadge('');
    setSelectedTechnology('');
  }, [activeTab]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{index + 4}</Text>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: item.avatar
              ? `${apiURL}/${item.avatar}`
              : 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png',
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
      <Text>{item.weightage}</Text>
    </View>
  );

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

        {loading && (
          <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
            <ActivityIndicator size={50} color={lightColor} />
            <Text style={styles.loadingText}>Loading...</Text>
          </Animated.View>
        )}

        {/* Top 3 Users */}
        <View style={{ marginVertical: 10, alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            <View
              style={{
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              {['1', '0', '2'].map(index => (
                <View
                  key={index}
                  style={{
                    alignItems: 'center',
                    top: index === '0' ? 0 : index === '1' ? 40 : 60,
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
                    <Text style={[styles.inactiveText]}>
                      {/* {users[index]?.weightage} */}
                      {users[index]?.weightage ||
                        users[index]?.achievements ||
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

      <View style={styles.container}>
        <FlatList
          data={users.slice(3)}
          renderItem={renderItem}
          keyExtractor={item => item.email}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Container>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: secondaryColor,
  },
  tabTitle: {
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  itemContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: lightColor,
  },
  active: {
    backgroundColor: lightColor,
  },
  inactive: {
    backgroundColor: primaryColor,
  },
  activeText: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: 'bold',
  },
  inactiveText: {
    fontSize: 16,
    color: lightColor,
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
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 5,
    backgroundColor: lightColor,
  },
  rankText: {
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: secondaryColor,
  },
  userName: {
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 12,
    color: darkColor,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: lightColor,
  },
});

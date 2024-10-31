import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';

import { width } from '../styles/sizes';
import Container from '../components/Container';
import React, { useState, useEffect } from 'react';

const users = [
  {
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: 'password123',
    mobile: '1234567890',
    country: 'United States',
    city: 'New York',
    role: 'user',
    avatar: 'alice.jpg',
    weightage: [
      { badgeId: 'bronze', technologyId: 'JavaScript', score: 70 },
      { badgeId: 'silver', technologyId: 'HTML', score: 80 },
    ],
  },
  {
    name: 'Bob Smith',
    email: 'bob@example.com',
    password: 'password123',
    mobile: '1234567891',
    country: 'United Kingdom',
    city: 'London',
    role: 'user',
    avatar: 'bob.jpg',
    weightage: [
      { badgeId: 'gold', technologyId: 'CSS', score: 88 },
      { badgeId: 'diamond', technologyId: 'React', score: 95 },
      { badgeId: 'silver', technologyId: 'Java', score: 82 },
      { badgeId: 'gold', technologyId: 'Python', score: 90 },
      { badgeId: 'bronze', technologyId: 'HTML', score: 65 },
    ],
  },
  {
    name: 'Charlies Davis',
    email: 'charlie@example.com',
    password: 'password123',
    mobile: '1234567892',
    country: 'Canada',
    city: 'Toronto',
    role: 'admin',
    avatar: 'charlie.jpg',
    weightage: [
      { badgeId: 'silver', technologyId: 'JavaScript', score: 75 },
      { badgeId: 'gold', technologyId: 'Python', score: 85 },
      { badgeId: 'diamond', technologyId: 'Java', score: 92 },
    ],
  },
  {
    name: 'Daisy Brown',
    email: 'daisy@example.com',
    password: 'password123',
    mobile: '1234567893',
    country: 'Australia',
    city: 'Sydney',
    role: 'user',
    avatar: 'daisy.jpg',
    weightage: [
      { badgeId: 'gold', technologyId: 'HTML', score: 85 },
      { badgeId: 'bronze', technologyId: 'CSS', score: 60 },
      { badgeId: 'silver', technologyId: 'JavaScript', score: 70 },
      { badgeId: 'gold', technologyId: 'Java', score: 78 },
      { badgeId: 'diamond', technologyId: 'React', score: 95 },
      { badgeId: 'silver', technologyId: 'CSS', score: 78 },
      { badgeId: 'diamond', technologyId: 'Java', score: 93 },
    ],
  },
  {
    name: 'Ethan Wilson',
    email: 'ethan@example.com',
    password: 'password123',
    mobile: '1234567894',
    country: 'India',
    city: 'Mumbai',
    role: 'admin',
    avatar: 'ethan.jpg',
    weightage: [
      { badgeId: 'gold', technologyId: 'JavaScript', score: 88 },
      { badgeId: 'silver', technologyId: 'Python', score: 82 },
    ],
  },
  {
    name: 'Fiona Green',
    email: 'fiona@example.com',
    password: 'password123',
    mobile: '1234567895',
    country: 'Germany',
    city: 'Berlin',
    role: 'user',
    avatar: 'fiona.jpg',
    weightage: [{ badgeId: 'bronze', technologyId: 'HTML', score: 65 }],
  },
  {
    name: 'George Miller',
    email: 'george@example.com',
    password: 'password123',
    mobile: '1234567896',
    country: 'France',
    city: 'Paris',
    role: 'user',
    avatar: 'george.jpg',
    weightage: [
      { badgeId: 'silver', technologyId: 'React', score: 82 },
      { badgeId: 'gold', technologyId: 'HTML', score: 90 },
      { badgeId: 'bronze', technologyId: 'Python', score: 68 },
      { badgeId: 'bronze', technologyId: 'JavaScript', score: 70 },
      { badgeId: 'diamond', technologyId: 'JavaScript', score: 94 },
    ],
  },
  {
    name: 'Hannah Scott',
    email: 'hannah@example.com',
    password: 'password123',
    mobile: '1234567897',
    country: 'Japan',
    city: 'Tokyo',
    role: 'user',
    avatar: 'hannah.jpg',
    weightage: [
      { badgeId: 'gold', technologyId: 'CSS', score: 88 },
      { badgeId: 'silver', technologyId: 'Python', score: 77 },
    ],
  },
  {
    name: 'Ian Taylor',
    email: 'ian@example.com',
    password: 'password123',
    mobile: '1234567898',
    country: 'Italy',
    city: 'Rome',
    role: 'user',
    avatar: 'ian.jpg',
    weightage: [
      { badgeId: 'silver', technologyId: 'React', score: 85 },
      { badgeId: 'gold', technologyId: 'Java', score: 91 },
    ],
  },
  {
    name: 'Jenny Evans',
    email: 'jenny@example.com',
    password: 'password123',
    mobile: '1234567899',
    country: 'Brazil',
    city: 'São Paulo',
    role: 'user',
    avatar: 'jenny.jpg',
    weightage: [
      { badgeId: 'bronze', technologyId: 'CSS', score: 60 },
      { badgeId: 'gold', technologyId: 'React', score: 89 },
      { badgeId: 'silver', technologyId: 'Python', score: 75 },
    ],
  },
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {}, [activeTab]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{index + 4}</Text>
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png',
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text
            style={styles.userDetails}>{`${item.country}, ${item.city}`}</Text>
        </View>
      </View>
      <Text>{item.weightage.length}</Text>
    </View>
  );
  return (
    <Container>
      <View style={styles.tabContainer}>
        {['All', 'Country', 'City'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabTitle,
              activeTab === tab ? styles.active : styles.inactive,
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.6}>
            <Text
              style={
                activeTab === tab ? styles.activeText : styles.inactiveText
              }>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            position: 'absolute',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={[styles.topContainer, { justifyContent: 'flex-end' }]}>
              <Image
                source={{
                  uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829453_user_512x512.png',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {users[1].name.substring(0, 3)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {users[1].weightage.length}
              </Text>
            </View>
            <View style={styles.topContainer}>
              <Image
                source={{
                  uri: 'https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {users[0].name.substring(0, 5)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {users[0].weightage.length}
              </Text>
            </View>
            <View style={[styles.topContainer, { justifyContent: 'flex-end' }]}>
              <Image
                source={{
                  uri: 'https://www.shareicon.net/data/128x128/2016/09/15/829460_user_512x512.png',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {users[2].name.substring(0, 7)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {users[2].weightage.length}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            height: width * 0.75,
            justifyContent: 'flex-end',
          }}>
          <Image
            source={require('../../assets/images/boxes.png')}
            style={{
              width: width,
              height: width * 0.4,
              resizeMode: 'contain',
            }}
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
  tabContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tabTitle: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: secondaryColor,
  },
  itemContainer: {
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: lightColor,
  },
  active: {
    backgroundColor: secondaryColor,
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
    fontSize: 15,
    color: lightColor,
    fontWeight: 'bold',
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
  topContainer: {
    height: width / 2.4,
    alignItems: 'center',
  },
  indexText: {
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 5,
    color: darkColor,
    backgroundColor: lightColor,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: 'gray',
  },
  userName: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 12,
    color: 'gray',
  },
  rankText: {
    marginTop: 4,
    fontSize: 15,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 30,
    color: lightColor,
    backgroundColor: '#978EE7',
  },
});

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import Container from '../components/Container';
import { width } from '../styles/sizes';
import { SelectList } from 'react-native-dropdown-select-list';
import { primaryColor, secondaryColor } from '../styles/colors';

const users = [
  {
    name: 'Alice Johnson',
    country: 'United States of America',
    city: 'New York',
    badges: [
      {
        badge: 'Bronze',
        technology: 'React',
      },
      {
        badge: 'Gold',
        technology: 'JavaScript',
      },
      {
        badge: 'Silver',
        technology: 'Python',
      },
      {
        badge: 'Diamond',
        technology: 'HTML',
      },
      {
        badge: 'Diamond',
        technology: 'JavaScript',
      },
    ],
  },
  {
    name: 'Bob Smith',
    country: 'Canada',
    city: 'Toronto',
    badges: [
      {
        badge: 'Silver',
        technology: 'HTML',
      },
      {
        badge: 'Bronze',
        technology: 'React',
      },
      {
        badge: 'Gold',
        technology: 'JavaScript',
      },
    ],
  },
  {
    name: 'Charlie Brown',
    country: 'United Kingdom',
    city: 'London',
    badges: [
      {
        badge: 'Gold',
        technology: 'Python',
      },
      {
        badge: 'Diamond',
        technology: 'React',
      },
      {
        badge: 'Silver',
        technology: 'JavaScript',
      },
      {
        badge: 'Bronze',
        technology: 'HTML',
      },
      {
        badge: 'Diamond',
        technology: 'Python',
      },
      {
        badge: 'Gold',
        technology: 'HTML',
      },
      {
        badge: 'Silver',
        technology: 'React',
      },
    ],
  },
  {
    name: 'Diana Prince',
    country: 'Australia',
    city: 'Sydney',
    badges: [
      {
        badge: 'Bronze',
        technology: 'JavaScript',
      },
      {
        badge: 'Silver',
        technology: 'HTML',
      },
    ],
  },
  {
    name: 'Edward Wang',
    country: 'China',
    city: 'Beijing',
    badges: [
      {
        badge: 'Gold',
        technology: 'React',
      },
      {
        badge: 'Diamond',
        technology: 'JavaScript',
      },
      {
        badge: 'Silver',
        technology: 'Python',
      },
      {
        badge: 'Bronze',
        technology: 'HTML',
      },
    ],
  },
  {
    name: 'Fiona Lee',
    country: 'United States of America',
    city: 'Ohio',
    badges: [
      {
        badge: 'Silver',
        technology: 'JavaScript',
      },
    ],
  },
  {
    name: 'George Clark',
    country: 'Canada',
    city: 'Vancouver',
    badges: [
      {
        badge: 'Diamond',
        technology: 'Python',
      },
      {
        badge: 'Gold',
        technology: 'React',
      },
      {
        badge: 'Silver',
        technology: 'JavaScript',
      },
      {
        badge: 'Bronze',
        technology: 'HTML',
      },
      {
        badge: 'Diamond',
        technology: 'HTML',
      },
      {
        badge: 'Gold',
        technology: 'JavaScript',
      },
    ],
  },
  {
    name: 'Hannah Kim',
    country: 'South Korea',
    city: 'Seoul',
    badges: [
      {
        badge: 'Silver',
        technology: 'Python',
      },
      {
        badge: 'Gold',
        technology: 'HTML',
      },
    ],
  },
  {
    name: 'Isaac Newton',
    country: 'United Kingdom',
    city: 'Manchester',
    badges: [
      {
        badge: 'Gold',
        technology: 'Python',
      },
      {
        badge: 'Diamond',
        technology: 'JavaScript',
      },
      {
        badge: 'Silver',
        technology: 'React',
      },
      {
        badge: 'Bronze',
        technology: 'HTML',
      },
      {
        badge: 'Diamond',
        technology: 'React',
      },
      {
        badge: 'Gold',
        technology: 'HTML',
      },
      {
        badge: 'Silver',
        technology: 'JavaScript',
      },
      {
        badge: 'Bronze',
        technology: 'Python',
      },
    ],
  },
  {
    name: 'Julia Roberts',
    country: 'United States of America',
    city: 'Texas',
    badges: [
      {
        badge: 'Diamond',
        technology: 'React',
      },
      {
        badge: 'Gold',
        technology: 'JavaScript',
      },
      {
        badge: 'Silver',
        technology: 'Python',
      },
      {
        badge: 'Bronze',
        technology: 'HTML',
      },
      {
        badge: 'Diamond',
        technology: 'JavaScript',
      },
    ],
  },
];

const countries = [
  'Afghanistan',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bangladesh',
  'Belgium',
  'Canada',
  'China',
  'Denmark',
  'Finland',
  'France',
  'Georgia',
  'Germany',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Malaysia',
  'Maldives',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Qatar',
  'Romania',
  'Russia',
  'Saudi Arabia',
  'Sri Lanka',
  'Sudan',
  'Sweden',
  'Switzerland',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uzbekistan',
  'Zimbabwe',
];

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  // Reset filters when switching tabs
  useEffect(() => {
    setSelectedBadge('');
    setSelectedCountry('');
  }, [activeTab]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const badgeFilter = selectedBadge
        ? user.badges.some(b => b.badge === selectedBadge)
        : true;
      const countryFilter = selectedCountry
        ? user.country === selectedCountry
        : true;
      return badgeFilter && countryFilter;
    });
  }, [selectedBadge, selectedCountry]);

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.indexText}>{index + 4}</Text>

      <View style={styles.userInfo}>
        <Image
          source={{
            uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
          }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text
            style={styles.userDetails}>{`${item.country}, ${item.city}`}</Text>
        </View>
      </View>
      <Text>{item.badges.length}</Text>
    </View>
  );

  return (
    <Container>
      <View style={styles.container}>
        {['All', 'Badge', 'Country'].map(tab => (
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
      {activeTab === 'Badge' && (
        <SelectList
          setSelected={setSelectedBadge}
          boxStyles={styles.dropdown}
          dropdownStyles={styles.dropdownText}
          inputStyles={{ color: secondaryColor }}
          dropdownTextStyles={{ color: primaryColor }}
          data={['Gold', 'Silver', 'Bronze', 'Diamond'].map(badge => ({
            key: badge,
            value: badge,
          }))}
          save="value"
        />
      )}
      {activeTab === 'Country' && (
        <SelectList
          setSelected={setSelectedCountry}
          boxStyles={styles.dropdown}
          dropdownStyles={styles.dropdownText}
          inputStyles={{ color: secondaryColor }}
          dropdownTextStyles={{ color: primaryColor }}
          data={countries.map(country => ({
            key: country,
            value: country,
          }))}
          save="value"
        />
      )}

      <View style={{ position: 'relative' }}>
        <View
          style={{
            width: '85%',
            alignSelf: 'center',
            position: 'absolute',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={[
                styles.topContainer,
                { justifyContent: 'flex-end', bottom: 20 },
              ]}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[1].name.substring(0, 3)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {filteredUsers[1].badges.length}
              </Text>
            </View>
            <View style={styles.topContainer}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[0].name.substring(0, 5)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {filteredUsers[0].badges.length}
              </Text>
            </View>
            <View style={[styles.topContainer, { justifyContent: 'flex-end' }]}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[2].name.substring(0, 7)}
              </Text>
              <Text style={[styles.activeText, styles.rankText]}>
                {filteredUsers[2].badges.length}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginBottom: 10,
            height: width * 0.8,
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
      <FlatList
        data={filteredUsers.slice(3, 10)}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        keyExtractor={(item, index) => `${item.name}-${index}`}
      />
    </Container>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  tabTitle: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  active: {
    backgroundColor: primaryColor,
  },
  inactive: {
    backgroundColor: secondaryColor,
  },
  activeText: {
    fontSize: 16,
    color: secondaryColor,
    fontWeight: 'bold',
  },
  inactiveText: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: 'bold',
  },
  dropdown: {
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: primaryColor,
  },
  dropdownText: {
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: secondaryColor,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: primaryColor,
  },
  userInfo: {
    width: '70%',
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
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 35,
    resizeMode: 'contain',
    borderColor: primaryColor,
  },
  topContainer: {
    height: width / 2,
    alignItems: 'center',
  },
  indexText: {
    borderRadius: 20,
    paddingVertical: 5,
    color: primaryColor,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    backgroundColor: '#000',
  },
  userName: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 10,
    color: 'gray',
  },
  rankText: {
    fontSize: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: secondaryColor,
    backgroundColor: primaryColor,
  },
});

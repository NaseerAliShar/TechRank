import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SelectList } from 'react-native-dropdown-select-list';
import { backgroundColor, primaryColor } from '../styles/colors';
import { width } from '../styles/sizes';

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
  'Albania',
  'Algeria',
  'Andorra',
  'Angola',
  'Antigua',
  'Argentina',
  'Armenia',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bhutan',
  'Bolivia',
  'Bosnia',
  'Botswana',
  'Brazil',
  'Brunei',
  'Bulgaria',
  'Burundi',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Chad',
  'Chile',
  'China',
  'Colombia',
  'Comoros',
  'Congo',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Cyprus',
  'Czech',
  'Denmark',
  'Djibouti',
  'Dominica',
  'Ecuador',
  'Egypt',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Fiji',
  'Finland',
  'France',
  'Gabon',
  'Gambia',
  'Georgia',
  'Germany',
  'Ghana',
  'Greece',
  'Grenada',
  'Guatemala',
  'Guinea',
  'Guyana',
  'Haiti',
  'Honduras',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran',
  'Iraq',
  'Ireland',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  'Korea',
  'Kuwait',
  'Kyrgyzstan',
  'Laos',
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Lithuania',
  'Luxembourg',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Mauritania',
  'Mauritius',
  'Mexico',
  'Micronesia',
  'Moldova',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands',
  'New Zealand',
  'Nicaragua',
  'Niger',
  'Nigeria',
  'North Macedonia',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine',
  'Panama',
  'Paraguay',
  'Peru',
  'Philippines',
  'Poland',
  'Portugal',
  'Qatar',
  'Romania',
  'Russia',
  'Rwanda',
  'Samoa',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Singapore',
  'Slovakia',
  'Slovenia',
  'Somalia',
  'South Africa',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan',
  'Suriname',
  'Sweden',
  'Switzerland',
  'Tajikistan',
  'Tanzania',
  'Thailand',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates',
  'United Kingdom',
  'United States of America',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Vatican City',
  'Venezuela',
  'Vietnam',
  'Yemen',
  'Zambia',
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
      <Text
        style={{
          color: primaryColor,
          backgroundColor: '#000',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 20,
          fontWeight: '900',
        }}>
        {index + 4}
      </Text>

      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.userName}>{item.name}</Text>
          <Text
            style={styles.userDetails}>{`${item.country}, ${item.city}`}</Text>
        </View>
      </View>
      <Text style={styles.badgesCount}>{item.badges.length}</Text>
    </View>
  );

  return (
    <LinearGradient colors={backgroundColor} style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        style={styles.container}
        imageStyle={{ transform: [{ scale: 1.5 }] }}>
        <View style={styles.wrapper}>
          {['All', 'Badge', 'Country'].map(tab => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.card,
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
            dropdownStyles={styles.dropdownText}
            boxStyles={styles.dropdown}
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
            dropdownStyles={styles.dropdownText}
            boxStyles={styles.dropdown}
            dropdownTextStyles={{ color: primaryColor }}
            data={countries.map(country => ({
              key: country,
              value: country,
            }))}
            save="value"
          />
        )}
        <ScrollView style={{ paddingVertical: 10 }}>
          <View
            style={{
              marginHorizontal: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <View style={[styles.topContainer, { marginTop: 40 }]}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[1].name.substring(0, 3)}
              </Text>
              <Text
                style={[
                  styles.activeText,
                  {
                    backgroundColor: primaryColor,
                    paddingHorizontal: 25,
                    borderRadius: 10,
                  },
                ]}>
                {filteredUsers[1].badges.length}
              </Text>
            </View>
            <View style={[styles.topContainer]}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[0].name.substring(0, 5)}
              </Text>
              <Text
                style={[
                  styles.activeText,
                  {
                    backgroundColor: primaryColor,
                    paddingHorizontal: 25,
                    borderRadius: 10,
                  },
                ]}>
                {filteredUsers[0].badges.length}
              </Text>
            </View>
            <View style={[styles.topContainer, { marginTop: 40 }]}>
              <Image
                source={{
                  uri: 'http://res.cloudinary.com/daqwg7pwp/image/upload/v1726296128/aqhfwirtvjyztvxygmkz.jpg',
                }}
                style={styles.profileImageTop}
              />
              <Text style={styles.inactiveText}>
                {filteredUsers[2].name.substring(0, 7)}
              </Text>
              <Text
                style={[
                  styles.activeText,
                  {
                    backgroundColor: primaryColor,
                    paddingHorizontal: 25,
                    borderRadius: 10,
                  },
                ]}>
                {filteredUsers[2].badges.length}
              </Text>
            </View>
          </View>
          <Image
            source={require('../../assets/images/boxes.png')}
            style={{ width: width, height: width * 0.4, resizeMode: 'contain' }}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredUsers.slice(3, 10)}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            contentContainerStyle={styles.listContent}
          />
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  card: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  active: {
    backgroundColor: primaryColor,
  },
  inactive: {
    backgroundColor: 'transparent',
  },
  activeText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  inactiveText: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: 'bold',
  },
  dropdown: {
    marginHorizontal: 20,
    backgroundColor: primaryColor,
  },
  dropdownText: {
    marginHorizontal: 20,
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    elevation: 2,
    shadowRadius: 5,
    marginBottom: 15,
    borderRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 25,
  },
  profileImageTop: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 40,
    borderColor: primaryColor,
    borderWidth: 1,
    resizeMode: 'contain',
  },
  topContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userDetails: {
    fontSize: 12,
    color: '#555',
  },
  badgesCount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
});

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState, useMemo, useEffect } from 'react';
import { usersList } from '../utils/usersList';
import { countriesList } from '../utils/countriesList';
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [countries, setCountries] = useState([]);

  const getCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      setCountries(response.data);
      console.log('newdatat', response.data[110].name.common);
    } catch (error) {
      console.log('error fetching countries');
    }
  };

  const filteredUsers = useMemo(() => {
    let users = usersList;
    if (selectedCountry) {
      users = users.filter(user => user.country === selectedCountry);
    }
    if (selectedBadge) {
      users = users.filter(user =>
        user.badges.some(badge => badge.badge === selectedBadge),
      );
    }
    return users.sort((a, b) => b.badges.length - a.badges.length);
  }, [selectedBadge, selectedCountry]);

  useEffect(() => {
    getCountries();
  }, []);
  const resetFilters = () => {
    setSelectedBadge('');
    setSelectedCountry('');
  };

  return (
    <LinearGradient colors={['#cfd9df', '#e2ebf0']} style={styles.container}>
      <View style={styles.wrapper}>
        {['All', 'Badge', 'Country'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.card,
              activeTab === tab ? styles.active : styles.inActive,
            ]}
            onPress={() => {
              resetFilters();
              setActiveTab(tab);
            }}
            activeOpacity={0.6}>
            <Text style={styles.text}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'Badge' && (
        <SelectList
          setSelected={val => setSelectedBadge(val)}
          dropdownStyles={styles.dropdown}
          boxStyles={styles.dropdown}
          data={['Gold', 'Silver', 'Bronze', 'Diamond'].map(badge => ({
            key: badge,
            value: badge,
          }))}
          save="value"
        />
      )}
      {activeTab === 'Country' && (
        <SelectList
          setSelected={val => setSelectedCountry(val)}
          dropdownStyles={styles.dropdown}
          boxStyles={styles.dropdown}
          data={countries.map(country => ({
            key: country.name.common,
            value: country.name.common,
          }))}
          save="value"
        />
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredUsers}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.userInfo}>
              <Text>{index + 1}</Text>
              <Image
                source={{ uri: 'https://via.placeholder.com/50' }}
                style={styles.profileImage}
                resizeMode="contain"
              />
              <View style={{ width: '60%' }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userDetails}>
                  {item.country}, {item.city}
                </Text>
              </View>
              <Text style={styles.badgesCount}>{item.badges.length}</Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 20 }}
      />
    </LinearGradient>
  );
};

export default Leaderboard;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  wrapper: {
    marginBottom: 10,
    paddingVertical: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    justifyContent: 'space-around',
  },
  card: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  active: {
    backgroundColor: '#40798c',
  },
  inActive: {
    backgroundColor: '#70a1a1',
  },
  text: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdown: {
    marginHorizontal: 20,
  },
  itemContainer: {
    padding: 10,
    elevation: 2,
    shadowRadius: 5,
    marginBottom: 10,
    borderRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    backgroundColor: '#fff',
  },
  userInfo: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 12,
    color: '#555',
  },
  badgesCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import Home from '../screens/Home';
import Logout from '../components/Logout';
import Profile from '../components/Profile';
import Leaderboard from '../screens/Leaderboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 100,
          backgroundColor: '#000',
          borderBottomEndRadius: 25,
          borderBottomStartRadius: 25,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitle: () => (
          <View>
            <Image
              source={require('../../assets/images/techrank1.png')}
              style={styles.logo}
            />
          </View>
        ),
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="home"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
              style={focused ? styles.drawerActive : styles.drawerInActive}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="user"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
              style={focused ? styles.drawerActive : styles.drawerInActive}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="leaderboard"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
              style={focused ? styles.drawerActive : styles.drawerInActive}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ focused, size }) => (
            <FontAwesome
              name="power-off"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
              style={focused ? styles.drawerActive : styles.drawerInActive}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = {
  logo: {
    width: 280,
    height: 80,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
};

import Home from '../screens/Home';
import Help from '../screens/Help';
import Profile from '../screens/Profile';
import Leaderboard from '../screens/Leaderboard';
import Materials from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
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
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Materials
              name="leaderboard"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
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
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Materials
              name="help"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

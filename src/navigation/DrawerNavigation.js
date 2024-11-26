import { MaterialIcons, FontAwesome } from '../utils/icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Help, Home, Profile, Leaderboard } from '../screens/index';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
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
            <MaterialIcons
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
            <MaterialIcons
              name="help"
              size={size}
              color={focused ? '#007AFF' : '#8e8e93'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

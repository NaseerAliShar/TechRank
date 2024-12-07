import { Alert } from 'react-native';
import { goBack } from '../utils/navigation';
import { useUserStore } from '../store/userStore';
import { lightColor, primaryColor } from '../styles/colors';
import { Home, Help, Profile, Leaderboard } from '../screens/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '../utils/icons';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const { setUser } = useUserStore();
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => setUser(),
      },
    ]);
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: lightColor,
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <AntDesign
            name="arrowleft"
            size={25}
            color={lightColor}
            style={{ marginLeft: 20 }}
            onPress={() => goBack()}
          />
        ),
        tabBarShowLabel: false,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: primaryColor,
        tabBarStyle: {
          left: 0,
          right: 0,
          height: 60,
          borderBottomWidth: 1,
          backgroundColor: lightColor,
          borderBottomColor: primaryColor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="home" color={color} size={size} />
            ) : (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="stats-chart-sharp" color={color} size={size} />
            ) : (
              <Ionicons name="stats-chart-outline" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            ),
          headerRight: () => (
            <AntDesign
              name="setting"
              size={20}
              color={lightColor}
              style={{ marginRight: 20 }}
              onPress={() => handleLogout()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({ color, size, focused }) =>
            focused ? (
              <Ionicons name="help-circle" color={color} size={size} />
            ) : (
              <Ionicons name="help-circle-outline" color={color} size={size} />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

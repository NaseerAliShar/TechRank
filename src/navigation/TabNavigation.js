import Home from '../screens/Home';
import Help from '../screens/Help';
import Profile from '../screens/Profile';
import Leaderboard from '../screens/Leaderboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { darkColor, lightColor, primaryColor } from '../styles/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
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
            onPress={() => navigation.goBack()}
          />
        ),
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: darkColor,
        tabBarInactiveTintColor: darkColor,
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
              size={25}
              color={lightColor}
              style={{ marginRight: 20 }}
              onPress={() => navigation.navigate('EditProfile')}
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
}

import Home from '../screens/Home';
import Help from '../screens/Help';
import Profile from '../screens/Profile';
import Leaderboard from '../screens/Leaderboard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { primaryColor } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          fontSize: 20,
          color: '#000',
          fontWeight: '900',
        },

        headerLeft: () => (
          <AntDesign
            name="arrowleft"
            size={25}
            color="#000"
            style={{ marginLeft: 20 }}
            onPress={() => navigation.goBack()}
          />
        ),

        headerTintColor: '#000',

        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          backgroundColor: primaryColor,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="leaderboard" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Help"
        component={Help}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="help" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

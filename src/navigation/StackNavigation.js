import Tab from './TabNavigation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Header from '../components/Header';
import Quiz from '../screens/Quiz';
import Result from '../screens/Result';
import Splash from '../screens/Splash';
import Badges from '../screens/Badges';
import Analytics from '../screens/Analytics';
import { lightColor, primaryColor } from '../styles/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={Tab} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Badges"
        component={Badges}
        options={{
          headerShown: true,
          headerTintColor: lightColor,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTitle: () => <Header title="Badges" />,
        }}
      />
      <Stack.Screen
        name="Analytics"
        component={Analytics}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTintColor: lightColor,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTitle: () => <Header title="Analytics" />,
        }}
      />
    </Stack.Navigator>
  );
}

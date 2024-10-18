import Quiz from '../screens/Quiz';
import Login from '../auth/Login';
import Splash from '../screens/Splash';
import Result from '../screens/Result';
import Analytics from '../screens/Analytics';
import { DrawerNavigation } from './DrawerNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

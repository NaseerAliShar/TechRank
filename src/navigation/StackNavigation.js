import Quiz from '../screens/Quiz';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import {DrawerNavigation} from './DrawerNavigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Result from '../screens/Result';
import Answers from '../screens/Answers';

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
      <Stack.Screen name="Answers" component={Answers} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

import Tab from './TabNavigation';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Splash from '../screens/Splash';
import Badges from '../screens/Badges';
import Quiz from '../screens/Quiz';
import Result from '../screens/Result';
import Analytics from '../screens/Analytics';
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
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Badges" component={Badges} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="Analytics" component={Analytics} />
    </Stack.Navigator>
  );
}

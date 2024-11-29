import Login from '../auth/Login';
import Register from '../auth/Register';
import { TabNavigation } from './TabNavigation';
import { lightColor, primaryColor } from '../styles/colors';
import { Quiz, Result, Splash, Badges } from '../screens/index';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tab" component={TabNavigation} />
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
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: lightColor,
          headerStyle: {
            backgroundColor: primaryColor,
          },
          headerTitleStyle: {
            fontSize: 20,
            color: lightColor,
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

import Home from '../screens/Home';
import Exams from '../screens/Exams';
import Logout from '../components/Logout';
import Profile from '../components/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 100,
          backgroundColor: '#ccc',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        },
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Quizzes" component={Exams} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

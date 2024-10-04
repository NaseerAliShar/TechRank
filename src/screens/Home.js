import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../components/Profile';
import Logout from '../components/Logout';
import Help from '../components/Help';
import {Image} from 'react-native';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          height: 100,
          backgroundColor: '#000',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        },
        headerTintColor: '#fff',
        headerTitle: () => (
          <Image
            source={require('../../assets/techrank1.png')}
            style={{width: 200, height: 100, resizeMode: 'contain'}}
          />
        ),
      }}>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Logout" component={Logout} />
      <Drawer.Screen name="Help" component={Help} />
    </Drawer.Navigator>
  );
}

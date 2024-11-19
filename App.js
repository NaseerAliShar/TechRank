import { SafeAreaView } from 'react-native';
import { navigation } from './src/utils/navigation';
import Stack from './src/navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigation}>
        <Stack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

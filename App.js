import { SafeAreaView } from 'react-native';
import Stack from './src/navigation/StackNavigation';
import { navigationRef } from './src/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <Stack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

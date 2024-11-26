import { SafeAreaView } from 'react-native';
import { navigationRef } from './src/utils/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

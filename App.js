import { SafeAreaView } from 'react-native';
import Stack from './src/navigation/StackNavigation';
import { NavigationContainer } from '@react-navigation/native';
const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;

import { primaryColor } from '../styles/colors';
import { Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Loader = () => {
  return (
    <Animated.View entering={ZoomIn} style={styles.container}>
      <ActivityIndicator size={50} color={primaryColor} />
      <Text style={styles.text}>Loading...</Text>
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

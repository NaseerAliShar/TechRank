import { primaryColor } from '../styles/colors';
import { Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Loader = () => {
  return (
    <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
      <ActivityIndicator size={50} color={primaryColor} />
      <Text style={styles.loadingText}>Loading...</Text>
    </Animated.View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

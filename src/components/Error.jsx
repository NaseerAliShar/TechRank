import { primaryColor } from '../styles/colors';
import { Text, StyleSheet } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Error = ({ children }) => {
  return (
    <Animated.View entering={ZoomIn} style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </Animated.View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

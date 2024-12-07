import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { primaryColor, secondaryColor } from '../styles/colors';

const Gradient = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[primaryColor, secondaryColor]}
      style={[styles.container, style]}
      start={{ x: 1, y: 0.5 }}
      end={{ x: 0.5, y: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default Gradient;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

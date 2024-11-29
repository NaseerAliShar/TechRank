import { StyleSheet } from 'react-native';
import { lightColor, primaryColor } from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';

const Card = ({ children, style }) => {
  return (
    <LinearGradient
      colors={[primaryColor, primaryColor]}
      style={[styles.container, style]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}>
      {children}
    </LinearGradient>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

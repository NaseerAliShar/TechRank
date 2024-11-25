import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { primaryColor, secondaryColor } from '../styles/colors';

const SubContainer = ({ children }) => {
  return (
    <LinearGradient
      colors={[primaryColor, secondaryColor]}
      style={styles.container}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      {children}
    </LinearGradient>
  );
};

export default SubContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

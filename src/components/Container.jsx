import { backgroundColor } from '../styles/colors';
import { ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Container = ({ children }) => {
  return (
    <LinearGradient
      colors={backgroundColor}
      style={styles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={{ transform: [{ scale: 1.5 }] }}
        style={styles.container}>
        {children}
      </ImageBackground>
    </LinearGradient>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

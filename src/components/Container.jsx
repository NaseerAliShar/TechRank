import { primaryColor } from '../styles/colors';
import { View, StyleSheet, StatusBar } from 'react-native';

const Container = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor} />
      {children}
    </View>

    // <LinearGradient
    //   colors={backgroundColor}
    //   style={styles.container}
    //   start={{ x: 0, y: 1 }}
    //   end={{ x: 1, y: 1 }}>
    //   <ImageBackground
    //     source={require('../../assets/images/bgImage.png')}
    //     imageStyle={{ transform: [{ scale: 1.5 }] }}
    //     style={styles.container}>
    //     {children}
    //   </ImageBackground
    // </LinearGradient=
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: primaryColor,
  },
});

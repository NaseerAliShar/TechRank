import { View, StyleSheet, StatusBar } from 'react-native';
import { lightColor, secondaryColor } from '../styles/colors';

const Container = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={secondaryColor} />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
    backgroundColor: lightColor,
  },
});

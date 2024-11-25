import { View, StyleSheet, StatusBar } from 'react-native';
import { lightColor, primaryColor } from '../styles/colors';

const Container = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={primaryColor} />
      {children}
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: lightColor,
  },
});

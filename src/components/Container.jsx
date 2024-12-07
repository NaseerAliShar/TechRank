import { primaryColor } from '../styles/colors';
import { View, StyleSheet, StatusBar } from 'react-native';

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
    paddingTop: 10,
    marginHorizontal: 10,
  },
});

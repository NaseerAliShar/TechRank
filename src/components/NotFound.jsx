import { primaryColor } from '../styles/colors';
import { StyleSheet, Text, View } from 'react-native';

const NotFound = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: primaryColor,
    fontFamily: 'Poppins-SemiBold',
  },
});

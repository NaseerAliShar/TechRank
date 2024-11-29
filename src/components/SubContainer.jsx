import { primaryColor } from '../styles/colors';
import { View, StyleSheet } from 'react-native';

const SubContainer = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default SubContainer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    marginHorizontal: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: primaryColor,
  },
});

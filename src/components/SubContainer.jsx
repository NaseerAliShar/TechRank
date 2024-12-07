import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { lightColor } from '../styles/colors';

const SubContainer = ({ children, style }) => {
  return <Card style={[styles.container, style]}>{children}</Card>;
};

export default SubContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: lightColor,
  },
});

import {StyleSheet, Text, View} from 'react-native';

const Card = ({exam}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exam.title}</Text>
      <Text style={styles.description}>{exam.description}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    height: 200,
    elevation: 2,
    borderRadius: 10,
    shadowRadius: 10,
    marginVertical: 10,
    shadowOpacity: 0.1,
    shadowColor: '#000',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
    color: '#666',
  },
});

import {StyleSheet, Text, View} from 'react-native';

const Card = ({exam}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{exam.title}</Text>
        <Text style={styles.description}>{exam.description}</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: '#666',
  },
});

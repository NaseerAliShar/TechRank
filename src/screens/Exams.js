import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import instance from '../services/api';
import {Card} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {height, width} from '../styles/sizes';

const Quizzes = ({navigation}) => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    const getExams = async () => {
      try {
        const response = await instance.get('/quizzes');
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    getExams();
  }, [exams]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Quiz', {quizId: item._id})}>
      <Card style={styles.card}>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: item.technology.image}} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f4f9',
  },
  card: {
    margin: 5,
    padding: 10,
    elevation: 2,
    width: width * 0.45,
    shadowRadius: 10,
    borderRadius: 10,
    shadowOpacity: 0.1,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    marginBottom: 10,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Quizzes;

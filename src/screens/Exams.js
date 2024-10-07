import {StyleSheet, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import instance from '../services/api';
import Card from '../components/Card';

const Quizzes = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const getExams = async () => {
      try {
        const response = await instance.get('/quizzes');
        console.log('Fetched exams:', response.data);
        setExams(response.data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      }
    };
    getExams();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        contentContainerStyle={styles.list}
        renderItem={({item}) => <Card exam={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
});

export default Quizzes;

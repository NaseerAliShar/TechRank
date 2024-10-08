import instance from '../services/api';
import React, {useEffect, useState} from 'react';
import {
  Card,
  Button,
  Checkbox,
  RadioButton,
  ActivityIndicator,
} from 'react-native-paper';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

const Quiz = ({navigation, route}) => {
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const {quizId} = route.params;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const {data} = await instance.get(`quizzes/${quizId}`);
        setQuestions(data.questions);
      } catch (error) {
        console.log('Error fetching quizzes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const currentQuestion = questions[currentIndex];
  const percentage = (score / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestion.questionType === 'MultiChoice' && selectedOption) {
      if (selectedOption.isCorrect) setScore(score + 1);
      setSelectedOption(null);
    } else if (currentQuestion.questionType === 'MultiSelect') {
      const correctOptions = currentQuestion.options.filter(
        option => option.isCorrect,
      );
      if (
        selectedOptions.every(option => option.isCorrect) &&
        selectedOptions.length === correctOptions.length
      ) {
        setScore(score + 1);
      }
      setSelectedOptions([]);
    } else {
      return null;
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleMultiSelect = item => {
    setSelectedOptions(prev => {
      if (prev.includes(item)) {
        return prev.filter(option => option !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const renderItem = ({item}) => (
    <Card style={styles.optionCard}>
      {currentQuestion.questionType === 'MultiChoice' && (
        <RadioButton.Group
          onValueChange={option => setSelectedOption(option)}
          value={selectedOption}>
          <View style={styles.optionContainer}>
            <RadioButton value={item} />
            <Text style={styles.optionText}>{item.text}</Text>
          </View>
        </RadioButton.Group>
      )}

      {currentQuestion.questionType === 'MultiSelect' && (
        <Checkbox.Item
          label={item.text}
          position="leading"
          onPress={() => handleMultiSelect(item)}
          status={selectedOptions.includes(item) ? 'checked' : 'unchecked'}
        />
      )}
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={true} size={60} color="#6200ea" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentQuestion && (
        <View style={styles.quizContent}>
          <Text style={styles.questionText}>
            {currentQuestion.questionText}
          </Text>
          <FlatList
            data={currentQuestion.options}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
          <Button
            icon="arrow-right"
            mode="contained"
            style={styles.nextButton}
            onPress={handleNext}>
            {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}
          </Button>
        </View>
      )}

      {currentIndex >= questions.length && (
        <View>
          <View style={styles.congratsWrapper}>
            {percentage < 50 ? (
              <Image
                source={require('../../assets/images/oops.png')}
                style={styles.congratsImage}
              />
            ) : (
              <Image
                source={require('../../assets/images/congrats.png')}
                style={styles.congratsImage}
              />
            )}
            <Text style={styles.resultText}>
              {percentage < 50
                ? 'Oops! Better luck next time.'
                : 'Congratulations! You did great!'}
            </Text>
          </View>

          <View style={styles.resultWrapper}>
            <Text style={styles.scoreText}>Score: {score}</Text>
            <Text style={styles.percentageText}>
              Percentage: {percentage.toFixed(2)}%
            </Text>
            <Button
              style={styles.analyticsButton}
              mode="outlined"
              onPress={() => navigation.navigate('Results')}>
              <Text>View Detailed Analytics</Text>
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  quizContent: {
    paddingVertical: 50,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionCard: {
    padding: 10,
    elevation: 2,
    borderRadius: 5,
    shadowRadius: 10,
    marginVertical: 5,
    shadowOpacity: 0.2,
    shadowColor: '#000',
    backgroundColor: '#fff',
  },
  optionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  optionText: {
    fontSize: 15,
    marginLeft: 10,
    color: '#333',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#6200ea',
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 10,
    color: '#6200ea',
  },
  congratsWrapper: {
    marginVertical: 20,
    alignItems: 'center',
  },
  congratsImage: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  resultText: {
    fontSize: 18,
    marginTop: 15,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultWrapper: {
    margin: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  percentageText: {
    fontSize: 15,
    color: '#6200ea',
    marginBottom: 10,
  },
  analyticsButton: {
    marginTop: 20,
    borderColor: '#6200ea',
  },
});

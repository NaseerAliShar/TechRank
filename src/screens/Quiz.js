import {
  Card,
  Button,
  Checkbox,
  RadioButton,
  ActivityIndicator,
  ProgressBar,
} from 'react-native-paper';
import instance from '../services/api';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useEffect, useState, useCallback, useMemo} from 'react';

const Quiz = ({navigation, route}) => {
  const {quizId} = route.params;
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
  const progress = useMemo(
    () => currentIndex / questions.length,
    [currentIndex, questions.length],
  );

  const handleNext = useCallback(() => {
    let isCorrect = false;
    let updatedScore = score;
    let updatedWrongAnswers = wrongAnswers;
    let updatedCorrectAnswers = correctAnswers;

    if (currentIndex + 1 >= questions.length) {
      navigation.navigate('Result', {
        score: updatedScore,
        totalQuestions: questions.length,
        wrongAnswers: updatedWrongAnswers,
        correctAnswers: updatedCorrectAnswers,
      });
      return;
    }

    if (currentQuestion.questionType === 'MultiChoice' && selectedOption) {
      isCorrect = selectedOption.isCorrect;
      if (isCorrect) updatedScore += 1;
    } else if (currentQuestion.questionType === 'MultiSelect') {
      const correctOptions = currentQuestion.options.filter(
        option => option.isCorrect,
      );
      isCorrect =
        selectedOptions.every(option => option.isCorrect) &&
        selectedOptions.length === correctOptions.length;
      if (isCorrect) updatedScore += 1;
    }

    if (isCorrect) {
      updatedCorrectAnswers += 1;
    } else {
      updatedWrongAnswers += 1;
    }

    setScore(updatedScore);
    setSelectedOptions([]);
    setSelectedOption(null);
    setWrongAnswers(updatedWrongAnswers);
    setCorrectAnswers(updatedCorrectAnswers);
    setCurrentIndex(prevIndex => prevIndex + 1);
  }, [
    score,
    currentIndex,
    currentQuestion,
    selectedOption,
    selectedOptions,
    wrongAnswers,
    correctAnswers,
  ]);

  const handleMultiSelect = useCallback(
    item => {
      const isSelected = selectedOptions.includes(item);
      const newSelectedOptions = isSelected
        ? selectedOptions.filter(option => option !== item)
        : [...selectedOptions, item];
      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions],
  );

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
          labelStyle={{textAlign: 'left', marginHorizontal: 10}}
          onPress={() => handleMultiSelect(item)}
          status={selectedOptions.includes(item) ? 'checked' : 'unchecked'}
        />
      )}
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size={60} color="#6200ea" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!quizStarted) {
    return (
      <View style={styles.container}>
        <Button
          mode="contained"
          onPress={() => setQuizStarted(true)}
          style={{backgroundColor: '#6200ea'}}>
          Start Quiz
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {currentQuestion && (
        <View style={styles.quizContent}>
          <Text style={{textAlign: 'center'}}>
            {currentIndex + 1}/{questions.length}
          </Text>
          <ProgressBar
            color="#6200ea"
            progress={progress}
            style={styles.progressBar}
          />
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
            style={{backgroundColor: '#6200ea'}}
            onPress={handleNext}>
            {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}{' '}
          </Button>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCard: {
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 15,
    color: '#6200ea',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: '#e0e0e0',
  },
});

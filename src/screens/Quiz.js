import {
  Card,
  Button,
  Checkbox,
  RadioButton,
  ProgressBar,
  ActivityIndicator,
} from 'react-native-paper';
import Result from './Result';
import instance from '../services/api';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';

const Quiz = ({ route }) => {
  const { quizId } = route.params;
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userSelections, setUserSelections] = useState([]);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await instance.get(`quizzes/${quizId}`);
        setQuestions(data.questions);
      } catch (error) {
        console.log('Error fetching quizzes', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [quizId]);

  const progress = useMemo(
    () => currentIndex / questions.length,
    [currentIndex, questions.length],
  );

  const handleNext = useCallback(() => {
    const currentQuestion = questions[currentIndex];
    const isMultiChoice = currentQuestion.questionType === 'MultiChoice';

    // Determine if the answer is correct
    const isCorrect = isMultiChoice
      ? selectedOption?.isCorrect
      : selectedOptions.every(option => option.isCorrect) &&
        selectedOptions.length ===
          currentQuestion.options.filter(option => option.isCorrect).length;

    // Update the score and the lists of correct or wrong answers
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectAnswers(prev => [...prev, currentQuestion]);
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion]);
    }

    // Save user selections for the current question
    const updatedSelections = [...userSelections];
    updatedSelections[currentIndex] = isMultiChoice
      ? [selectedOption] // Store the selected option as an array
      : selectedOptions; // Store selected options for multi-select
    setUserSelections(updatedSelections);

    // Move to the next question or navigate to the results if it was the last question
    if (currentIndex + 1 >= questions.length) {
      setQuizFinished(true);
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    // Reset selected options
    setSelectedOptions([]);
    setSelectedOption(null);
  }, [
    score,
    questions,
    currentIndex,
    selectedOption,
    selectedOptions,
    correctAnswers,
    wrongAnswers,
    userSelections,
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

  const renderItem = ({ item }) => {
    const isMultiChoice =
      questions[currentIndex].questionType === 'MultiChoice';
    const isSelected = isMultiChoice
      ? selectedOption === item
      : selectedOptions.includes(item);

    return (
      <Card style={styles.optionCard}>
        {isMultiChoice ? (
          <RadioButton.Group
            onValueChange={option => setSelectedOption(option)}
            value={selectedOption}>
            <View style={styles.optionContainer}>
              <RadioButton value={item} />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>
          </RadioButton.Group>
        ) : (
          <Checkbox.Item
            label={item.text}
            position="leading"
            labelStyle={{ textAlign: 'left', marginHorizontal: 10 }}
            onPress={() => handleMultiSelect(item)}
            status={isSelected ? 'checked' : 'unchecked'}
          />
        )}
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size={50} color="#000" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!questions.length) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No questions found</Text>
      </View>
    );
  }

  if (quizFinished) {
    return (
      <Result
        score={score}
        questions={questions}
        wrongAnswers={wrongAnswers}
        correctAnswers={correctAnswers}
        userSelections={userSelections}
      />
    );
  }

  return (
    <View style={styles.container}>
      {questions.length > 0 && (
        <View style={styles.quizContent}>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{questions.length}
          </Text>
          <ProgressBar
            color="#000"
            progress={progress}
            style={styles.progressBar}
          />
          <Text style={styles.questionText}>
            {questions[currentIndex].questionText}
          </Text>
          <FlatList
            data={questions[currentIndex].options}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />
          <Button
            icon="arrow-right"
            mode="contained"
            loading={loading}
            onPress={handleNext}
            style={styles.nextButton}
            disabled={!selectedOption && !selectedOptions.length}>
            {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}
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
    backgroundColor: '#f1f1f1',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 15,
    color: '#000',
  },
  quizContent: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: '#fff',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  optionCard: {
    borderRadius: 30,
    marginVertical: 5,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#000',
    marginTop: 20,
    borderRadius: 25,
  },
});

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
import Container from '../components/Container';
import { primaryColor, secondaryColor } from '../styles/colors';
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
        const { data } = await instance.get(`questions`);
        setQuestions(data);
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
              <RadioButton
                value={item}
                theme={{ colors: { primary: 'red' } }}
              />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>
          </RadioButton.Group>
        ) : (
          <Checkbox.Item
            label={item.text}
            position="leading"
            theme={{ colors: { primary: 'red' } }}
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
      <Container>
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size={50} color={primaryColor} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Container>
    );
  }

  if (!questions.length) {
    return (
      <Container>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>No questions found</Text>
        </View>
      </Container>
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
    <Container>
      <View style={styles.container}>
        {questions.length > 0 && (
          <View style={styles.quizContent}>
            <Text style={styles.progressText}>
              {currentIndex + 1}/{questions.length}
            </Text>
            <ProgressBar
              color={primaryColor}
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
              textColor={secondaryColor}
              buttonColor={primaryColor}
              loading={loading}
              onPress={handleNext}
              disabled={!selectedOption && !selectedOptions.length}>
              {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}
            </Button>
          </View>
        )}
      </View>
    </Container>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  quizContent: {
    flex: 1,
    justifyContent: 'center',
  },
  progressText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#fff',
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 15,
    backgroundColor: 'gray',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  optionCard: {
    borderRadius: 30,
    marginVertical: 5,
    backgroundColor: primaryColor,
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

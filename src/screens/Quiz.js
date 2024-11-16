import {
  Card,
  Button,
  Checkbox,
  RadioButton,
  ProgressBar,
  ActivityIndicator,
} from 'react-native-paper';
import Result from './Result';
import { width } from '../styles/sizes';
import instance from '../services/services';
import Container from '../components/Container';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';

const Quiz = () => {
  const [time, setTime] = useState(0);
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
  }, []);

  useEffect(() => {
    let timer;
    if (!quizFinished) {
      const startTime = Date.now();
      timer = setInterval(() => {
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        setTime(elapsedTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizFinished]);

  const progress = useMemo(
    () => currentIndex / questions.length,
    [currentIndex, questions.length],
  );

  const handleNext = useCallback(() => {
    const currentQuestion = questions[currentIndex];
    const isMultiChoice = currentQuestion.questionType === 'MultiChoice';

    const isCorrect = isMultiChoice
      ? selectedOption?.isCorrect
      : selectedOptions.every(option => option.isCorrect) &&
        selectedOptions.length ===
          currentQuestion.options.filter(option => option.isCorrect).length;

    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
      setCorrectAnswers(prev => [...prev, currentQuestion]);
    } else {
      setWrongAnswers(prev => [...prev, currentQuestion]);
    }

    const updatedSelections = [...userSelections];
    updatedSelections[currentIndex] = isMultiChoice
      ? [selectedOption]
      : selectedOptions;
    setUserSelections(updatedSelections);

    if (currentIndex + 1 >= questions.length) {
      setQuizFinished(true);
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    setSelectedOptions([]);
    setSelectedOption(null);
  }, [
    questions,
    currentIndex,
    selectedOption,
    selectedOptions,
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
                theme={{ colors: { primary: primaryColor } }}
              />
              <Text style={styles.optionText}>{item.text}</Text>
            </View>
          </RadioButton.Group>
        ) : (
          <Checkbox.Item
            label={item.text}
            position="leading"
            theme={{ colors: { primary: primaryColor } }}
            labelStyle={[styles.optionText, { textAlign: 'left' }]}
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
          <ActivityIndicator animating={true} size={50} color={lightColor} />
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
        time={time}
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
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          height: width / 4,
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: lightColor,
        }}>
        <View>
          <Text style={styles.progressText}>Questions</Text>
          <Text style={{ textAlign: 'center' }}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>
        <View>
          <Text style={styles.progressText}>Topic</Text>
          <Text>JavaScript</Text>
        </View>
        <View>
          <Text style={styles.progressText}>Duration</Text>
          <Text style={{ textAlign: 'center' }}>10 min</Text>
        </View>
      </View>
      {questions.length > 0 && (
        <View style={styles.container}>
          <View style={{ alignSelf: 'center' }}>
            <CountdownCircleTimer
              isPlaying={!quizFinished}
              size={40}
              duration={500}
              strokeWidth={4}
              colorsTime={[60, 30, 15, 0]}
              onComplete={() => {
                setQuizFinished(true);
                return { shouldRepeat: false, delay: 0 };
              }}
              colors={[primaryColor, secondaryColor, 'yellow', 'red']}>
              {({ remainingTime }) => {
                const seconds = remainingTime % 60;
                const minutes = Math.floor(remainingTime / 60);
                if (remainingTime === 0) {
                  setQuizFinished(true);
                }

                return (
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 12 }}>{minutes}:</Text>
                      <Text style={{ fontSize: 12 }}>
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </Text>
                    </View>
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>
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

          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Button
                icon="arrow-left"
                mode="contained"
                textColor={lightColor}
                buttonColor={primaryColor}
                loading={loading}
                onPress={() => setCurrentIndex(prevIndex => prevIndex - 1)}
                disabled={currentIndex === 0}>
                Prev
              </Button>
            </View>
            <View>
              <Button
                icon="arrow-right"
                mode="contained"
                textColor={lightColor}
                buttonColor={primaryColor}
                loading={loading}
                onPress={handleNext}
                contentStyle={{ flexDirection: 'row-reverse' }}
                disabled={!selectedOption && !selectedOptions.length}>
                {currentIndex + 1 >= questions.length ? 'Finish' : 'Next'}
              </Button>
            </View>
          </View>
        </View>
      )}
    </Container>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  progressText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: primaryColor,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: secondaryColor,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 5,
    color: primaryColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  optionContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCard: {
    margin: 5,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: primaryColor,
  },
  optionText: {
    fontSize: 16,
    color: primaryColor,
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
    color: lightColor,
  },
});

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  Error,
  Loader,
  NotFound,
  SubContainer,
} from '../components/index';
import { width } from '../styles/sizes';
import { Result } from '../screens/index';
import { apiURL } from '../config/config';
import { instance } from '../services/services';
import { useEffect, useState, useCallback } from 'react';
import { Card, Button, Checkbox, RadioButton } from 'react-native-paper';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';

const Quiz = ({ route }) => {
  const { badge, technology } = route.params;
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userSelections, setUserSelections] = useState([]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const { data } = await instance.get(`questions`);
      setQuestions(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error?.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    let timer;
    if (!quizFinished) {
      const startTime = Date.now();
      timer = setInterval(() => {
        setTime(Math.round((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizFinished]);

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

    setUserSelections(prevSelections => {
      const updatedSelections = [...prevSelections];
      updatedSelections[currentIndex] = isMultiChoice
        ? [selectedOption]
        : selectedOptions;
      return updatedSelections;
    });

    if (currentIndex + 1 >= questions.length) {
      setQuizFinished(true);
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }

    // Reset selections
    setSelectedOptions([]);
    setSelectedOption(null);
  }, [questions, currentIndex, selectedOption, selectedOptions]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      const previousIndex = currentIndex - 1;
      const previousSelections = userSelections[previousIndex] || [];
      const previousQuestion = questions[previousIndex];

      const isMultiChoice = previousQuestion.questionType === 'MultiChoice';
      const previousIsCorrect = isMultiChoice
        ? previousSelections[0]?.isCorrect
        : previousSelections.every(option => option.isCorrect) &&
          previousSelections.length ===
            previousQuestion.options.filter(option => option.isCorrect).length;

      // Update score and answers
      if (previousIsCorrect) {
        setScore(prevScore => prevScore - 1);
        setCorrectAnswers(prev => prev.filter(q => q !== previousQuestion));
      } else {
        setWrongAnswers(prev => prev.filter(q => q !== previousQuestion));
      }

      // Restore selections
      if (Array.isArray(previousSelections)) {
        setSelectedOptions(previousSelections);
        setSelectedOption(null);
      } else {
        setSelectedOption(previousSelections[0] || null);
        setSelectedOptions([]);
      }
      setCurrentIndex(previousIndex);
    }
  }, [currentIndex, userSelections, questions]);

  const handleMultiSelect = useCallback(item => {
    setSelectedOptions(prevOptions =>
      prevOptions.includes(item)
        ? prevOptions.filter(option => option !== item)
        : [...prevOptions, item],
    );
  }, []);

  const renderItem = ({ item }) => {
    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return null;

    const isMultiChoice = currentQuestion.questionType === 'MultiChoice';
    const isSelected = isMultiChoice
      ? selectedOption === item
      : selectedOptions.includes(item);

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          if (isMultiChoice) {
            setSelectedOption(item);
          } else {
            handleMultiSelect(item);
          }
        }}>
        <Card style={styles.optionCard}>
          <View>
            {isMultiChoice ? (
              <View style={styles.optionContainer}>
                <RadioButton
                  value={item}
                  status={isSelected ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption(item)}
                  theme={{ colors: { primary: primaryColor } }}
                />
                <Text style={styles.optionText}>{item.text}</Text>
              </View>
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
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
  };

  if (quizFinished) {
    return (
      <Result
        time={time}
        score={score}
        badge={badge}
        questions={questions}
        technology={technology}
        wrongAnswers={wrongAnswers}
        correctAnswers={correctAnswers}
        userSelections={userSelections}
      />
    );
  }

  if (loading) return <Loader />;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <Card>
        <View style={styles.topCard}>
          <Image
            source={{
              uri: `${apiURL}/${technology.image}`,
            }}
            style={{
              width: width / 8,
              height: width / 8,
              resizeMode: 'contain',
            }}
          />

          <CountdownCircleTimer
            isPlaying={!quizFinished}
            size={40}
            duration={600}
            strokeWidth={5}
            colors={['#4F08AF', '#4F08AF', '#A30000', '#A30000']}
            colorsTime={[60, 30, 15, 0]}
            onComplete={() => {
              setQuizFinished(true);
              return { shouldRepeat: false, delay: 0 };
            }}>
            {({ remainingTime }) => {
              const seconds = remainingTime % 60;
              const minutes = Math.floor(remainingTime / 60);
              if (remainingTime === 0) {
                setQuizFinished(true);
              }

              return (
                <View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 13, color: primaryColor }}>
                      {minutes}:
                    </Text>
                    <Text style={{ fontSize: 13, color: primaryColor }}>
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </Text>
                  </View>
                </View>
              );
            }}
          </CountdownCircleTimer>

          <Image
            source={{
              uri: `${apiURL}/${badge.icon}`,
            }}
            style={{
              width: width / 8,
              height: width / 8,
              resizeMode: 'contain',
            }}
          />
        </View>
      </Card>
      <View style={{ marginTop: 10, alignSelf: 'center' }}>
        <Text
          style={{
            fontSize: 20,
            color: primaryColor,
            fontFamily: 'Poppins-SemiBold',
          }}>
          {currentIndex + 1}/{questions.length}
        </Text>
      </View>
      <SubContainer>
        {!questions ? (
          <NotFound>No Questions found</NotFound>
        ) : (
          <View>
            <Text style={styles.questionText}>
              {questions[currentIndex]?.questionText}
            </Text>
            <FlatList
              data={questions[currentIndex]?.options}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
            />

            <View
              style={{
                marginTop: width / 2,
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View>
                <Button
                  icon="arrow-left"
                  mode="contained"
                  textColor={lightColor}
                  buttonColor={primaryColor}
                  loading={loading}
                  onPress={handlePrev}
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
      </SubContainer>
    </Container>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  topCard: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    borderRadius: 30,
  },
  optionText: {
    fontSize: 16,
    color: primaryColor,
  },
});

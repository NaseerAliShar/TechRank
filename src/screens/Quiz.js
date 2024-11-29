import {
  Button,
  Checkbox,
  ProgressBar,
  RadioButton,
  Card as Box,
} from 'react-native-paper';
import { width } from '../styles/sizes';
import { Result } from '../screens/index';
import { apiURL } from '../config/config';
import { instance } from '../services/services';
import { lightColor, primaryColor } from '../styles/colors';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Card, Container, Loader, SubContainer } from '../components/index';

const Quiz = ({ route }) => {
  const { badge, technology } = route.params;
  const [time, setTime] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      try {
        const { data } = await instance.get(`questions`);
        setQuestions(data);
        setLoading(false);
      } catch (error) {
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
      <Box style={styles.optionCard}>
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
      </Box>
    );
  };

  if (loading && questions.length === 0) {
    return <Loader />;
  }

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

  return (
    <Container>
      <Card style={{ justifyContent: 'space-around' }}>
        <View>
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
        </View>
        <View>
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
                    <Text style={{ fontSize: 13, color: lightColor }}>
                      {minutes}:
                    </Text>
                    <Text style={{ fontSize: 13, color: lightColor }}>
                      {seconds < 10 ? `0${seconds}` : seconds}
                    </Text>
                  </View>
                </View>
              );
            }}
          </CountdownCircleTimer>
        </View>
        <View>
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
      <View style={{ marginBottom: 10, alignSelf: 'center' }}>
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
        {questions.length === 0 ? (
          <Text style={{ color: lightColor, fontWeight: 'Bold', margin: 10 }}>
            No Badges found
          </Text>
        ) : (
          <View style={{ flex: 1 }}>
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
      </SubContainer>
    </Container>
  );
};

export default Quiz;

const styles = StyleSheet.create({
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
    backgroundColor: lightColor,
  },
  questionText: {
    fontSize: 18,
    marginVertical: 5,
    color: lightColor,
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

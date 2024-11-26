import React from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Button } from 'react-native-paper';
import { navigate } from '../utils/navigation';
import { instance } from '../services/services';
import { Container } from '../components/index';
import * as Progress from 'react-native-progress';
import { lightColor, primaryColor } from '../styles/colors';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Result = ({
  time,
  score,
  badge,
  technology,
  questions,
  wrongAnswers,
  correctAnswers,
  userSelections,
}) => {
  const totalQuestions = questions.length;
  const totalPercentage = (score / totalQuestions) * 100;
  const totalTime = {
    seconds: Math.round(time % 60),
    minutes: Math.floor(time / 60),
  };
  const avgTime = {
    seconds: Math.round((time / totalQuestions) % 60),
    minutes: Math.floor(time / totalQuestions / 60),
  };

  const submitResult = async () => {
    if (totalPercentage >= 80) {
      try {
        const payload = {
          level: badge.level,
          badgeId: badge._id,
          technologyId: technology._id,
        };
        await instance.post('/achievements/create', payload);
        console.log('Result submitted successfully');
      } catch (error) {
        console.error('Error submitting quiz result:', error);
      }
    } else {
      try {
        const payload = { badgeId: badge._id, technologyId: technology._id };
        await instance.post('/attempts/create', payload);
        console.log('Result submitted successfully');
      } catch (error) {
        console.error('Error submitting quiz result:', error);
      }
    }
  };

  React.useEffect(() => {
    submitResult();
  }, []);

  return (
    <Container>
      {totalPercentage >= 80 ? (
        <Image
          source={{ uri: `${apiURL}/${badge.icon}` }}
          style={styles.resultImage}
        />
      ) : (
        <Image
          source={require('../../assets/images/oops.png')}
          style={styles.resultImage}
        />
      )}
      <View style={styles.container}>
        {totalPercentage >= 80 ? (
          <View>
            <View style={styles.resultCard}>
              <View style={styles.resultProgress}>
                <Progress.Pie
                  size={30}
                  progress={totalPercentage / 100}
                  color={primaryColor}
                />
                <Text>{totalPercentage}%</Text>
              </View>
              <View style={styles.resultMessage}>
                <Text style={[styles.scoreMessage, { color: 'green' }]}>
                  Congratulations! You did great.
                </Text>
                <Text style={styles.scoreMessage}>
                  You scored {score} out of {questions.length}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.resultCard}>
              <View style={styles.resultProgress}>
                <Progress.Pie
                  size={30}
                  color={primaryColor}
                  progress={totalPercentage / 100}
                />
                <Text style={{ color: 'blue' }}>{totalPercentage}%</Text>
              </View>
              <View style={styles.resultMessage}>
                <Text style={[styles.scoreMessage, { color: 'red' }]}>
                  Oops! Better luck next time.
                </Text>
                <Text style={styles.scoreMessage}>
                  You scored {score} out of {questions.length}
                </Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.box, { backgroundColor: '#0E81B4' }]}>
                <Text style={styles.boxText}>Total Time</Text>
                <Text style={styles.boxText}>
                  {totalTime.minutes < 10
                    ? `0${totalTime.minutes}`
                    : totalTime.minutes}
                  :
                  {totalTime.seconds < 10
                    ? `0${totalTime.seconds}`
                    : totalTime.seconds}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.box, { backgroundColor: '#F2954D' }]}>
                <Text style={styles.boxText}>Avg Time</Text>
                <Text style={styles.boxText}>
                  {avgTime.minutes < 10
                    ? `0${avgTime.minutes}`
                    : avgTime.minutes}
                  :
                  {avgTime.seconds < 10
                    ? `0${avgTime.seconds}`
                    : avgTime.seconds}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.boxContainer}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.box, { backgroundColor: '#27AE60' }]}>
                <Text style={styles.boxText}>Correct Answers</Text>
                <Text style={styles.boxText}>{correctAnswers.length}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[styles.box, { backgroundColor: '#EB5757' }]}>
                <Text style={styles.boxText}>Wrong Answers</Text>
                <Text style={styles.boxText}>{wrongAnswers.length}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Button
                style={styles.analyticsButton}
                mode="outlined"
                onPress={() =>
                  navigate('Leaderboard', {
                    questions,
                    wrongAnswers,
                    correctAnswers,
                    userSelections,
                  })
                }>
                <Text style={styles.analyticsButtonText}>Leaderboard</Text>
              </Button>
              <Button
                style={styles.backButton}
                mode="outlined"
                onPress={() => navigate('Home')}>
                <Text style={styles.backButtonText}>Try Again</Text>
              </Button>
            </View>
          </View>
          <View>
            <Text
              style={{ margin: 10, color: primaryColor, textAlign: 'center' }}>
              *Analytics are available for premium users only.
            </Text>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  resultImage: {
    marginVertical: 20,
    width: width * 0.8,
    height: width * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  resultCard: {
    borderWidth: 2,
    borderRadius: 10,
    height: width / 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
  },
  resultProgress: {
    width: '20%',
    alignItems: 'center',
    borderRightWidth: 2,
    borderColor: primaryColor,
  },
  scoreMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: primaryColor,
  },
  resultMessage: {
    width: '80%',
    alignItems: 'center',
  },
  analyticsButton: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: primaryColor,
  },
  analyticsButtonText: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  boxContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 20,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: primaryColor,
  },
  boxText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: primaryColor,
  },
  backButtonText: {
    color: lightColor,
    fontWeight: 'bold',
  },
});

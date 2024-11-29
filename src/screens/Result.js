import React from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Button } from 'react-native-paper';
import { navigate } from '../utils/navigation';
import { instance } from '../services/services';
import * as Progress from 'react-native-progress';
import { Card, Container } from '../components/index';
import { lightColor, primaryColor } from '../styles/colors';
import { View, Text, Image, StyleSheet } from 'react-native';

const Result = ({
  time,
  score,
  badge,
  questions,
  technology,
  wrongAnswers,
  correctAnswers,
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
      {totalPercentage >= 80 ? (
        <Card>
          <View style={styles.resultProgress}>
            <Progress.Pie
              size={40}
              progress={totalPercentage / 100}
              color={lightColor}
            />
            <Text style={styles.text}>{totalPercentage}%</Text>
          </View>
          <View style={styles.resultMessage}>
            <Text style={[styles.text, { color: 'green' }]}>
              Congratulations! You did great.
            </Text>
            <Text style={styles.text}>
              You scored {score} out of {questions.length}
            </Text>
          </View>
        </Card>
      ) : (
        <Card>
          <View style={styles.resultProgress}>
            <Progress.Pie
              size={40}
              color={lightColor}
              progress={totalPercentage / 100}
            />
            <Text style={{ color: primaryColor }}>{totalPercentage}%</Text>
          </View>
          <View style={styles.resultMessage}>
            <Text style={[styles.text, { color: 'red' }]}>
              Oops! Better luck next time.
            </Text>
            <Text style={styles.text}>
              You scored {score} out of {questions.length}
            </Text>
          </View>
        </Card>
      )}
      <View>
        <View style={styles.cardRow}>
          <Card style={styles.card}>
            <Text style={styles.text}>Total Time</Text>
            <Text style={styles.text}>
              {totalTime.minutes < 10
                ? `0${totalTime.minutes}`
                : totalTime.minutes}
              :
              {totalTime.seconds < 10
                ? `0${totalTime.seconds}`
                : totalTime.seconds}
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text style={styles.text}>Avg Time</Text>
            <Text style={styles.text}>
              {avgTime.minutes < 10 ? `0${avgTime.minutes}` : avgTime.minutes}:
              {avgTime.seconds < 10 ? `0${avgTime.seconds}` : avgTime.seconds}
            </Text>
          </Card>
        </View>
        <View style={styles.cardRow}>
          <Card style={styles.card}>
            <Text style={styles.text}>Correct Answers</Text>
            <Text style={styles.text}>{correctAnswers.length}</Text>
          </Card>
          <Card style={styles.card}>
            <Text style={styles.text}>Wrong Answers</Text>
            <Text style={styles.text}>{wrongAnswers.length}</Text>
          </Card>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Button
            style={styles.leaderboardBtn}
            mode="outlined"
            onPress={() => navigate('Leaderboard')}>
            <Text style={[styles.text, { color: primaryColor }]}>
              Leaderboard
            </Text>
          </Button>

          {totalPercentage >= 80 ? (
            <Card style={styles.button}>
              <Button
                style={{ borderWidth: 0, padding: 0 }}
                mode="outlined"
                onPress={() => navigate('Home')}>
                <Text style={styles.text}>Home</Text>
              </Button>
            </Card>
          ) : (
            <Card style={styles.button}>
              <Button
                style={{ borderWidth: 0, padding: 0 }}
                mode="outlined"
                onPress={() => navigate('Badges', { technology })}>
                <Text style={styles.text}>Try Again</Text>
              </Button>
            </Card>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Result;

const styles = StyleSheet.create({
  resultImage: {
    marginVertical: 20,
    width: width * 0.8,
    height: width * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  resultProgress: {
    width: '20%',
    alignItems: 'center',
    borderRightWidth: 2,
  },
  resultMessage: {
    width: '80%',
    alignItems: 'center',
  },
  leaderboardBtn: {
    marginTop: 20,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: primaryColor,
    backgroundColor: lightColor,
  },
  cardRow: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    paddingVertical: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 16,
    color: lightColor,
    fontWeight: 'bold',
  },
  button: {
    padding: 0,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: primaryColor,
  },
});

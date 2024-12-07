import React from 'react';
import { width } from '../styles/sizes';
import { apiURL } from '../config/config';
import { Card } from 'react-native-paper';
import { navigate } from '../utils/navigation';
import { instance } from '../services/services';
import * as Progress from 'react-native-progress';
import { useUserStore } from '../store/userStore';
import { lightColor, primaryColor } from '../styles/colors';
import { Error, Gradient, Container, Loader } from '../components/index';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

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
  const { error, loading, user, setUser, fetchData } = useUserStore();
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
        fetchData();
        setUser(user);
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

  if (loading) {
    <Loader />;
  }

  if (error) {
    <Error>{error}</Error>;
  }
  return (
    <Container>
      {totalPercentage >= 80 ? (
        <Image
          source={{ uri: `${apiURL}/${badge.icon}` }}
          style={styles.logo}
        />
      ) : (
        <Image
          source={require('../../assets/images/testfaild.png')}
          style={styles.logo}
        />
      )}
      {totalPercentage >= 80 ? (
        <Card style={{ marginTop: 10 }}>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <View style={styles.resultProgress}>
              <Progress.Pie
                size={40}
                progress={totalPercentage / 100}
                color={primaryColor}
              />
              <Text style={[styles.text, { color: primaryColor }]}>
                {totalPercentage}%
              </Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={[styles.text, { color: 'green' }]}>
                Congratulations! You did great.
              </Text>
              <Text style={[styles.text, { color: primaryColor }]}>
                You scored {score} out of {questions.length}
              </Text>
            </View>
          </View>
        </Card>
      ) : (
        <Card>
          <View
            style={{
              padding: 10,
              flexDirection: 'row',
              alignContent: 'center',
            }}>
            <View style={styles.resultProgress}>
              <Progress.Pie
                size={40}
                color={primaryColor}
                progress={totalPercentage / 100}
              />
              <Text style={{ color: primaryColor }}>{totalPercentage}%</Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={[styles.text, { color: 'red' }]}>
                Oops! Better luck next time.
              </Text>
              <Text style={[styles.text, { color: primaryColor }]}>
                You scored {score} out of {questions.length}
              </Text>
            </View>
          </View>
        </Card>
      )}
      <View>
        <View style={styles.cardContainer}>
          <Gradient style={styles.card}>
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
          </Gradient>
          <Gradient style={styles.card}>
            <Text style={styles.text}>Avg Time</Text>
            <Text style={styles.text}>
              {avgTime.minutes < 10 ? `0${avgTime.minutes}` : avgTime.minutes}:
              {avgTime.seconds < 10 ? `0${avgTime.seconds}` : avgTime.seconds}
            </Text>
          </Gradient>
        </View>
        <View style={styles.cardContainer}>
          <Gradient style={styles.card}>
            <Text style={styles.text}>Correct Answers</Text>
            <Text style={styles.text}>{correctAnswers.length}</Text>
          </Gradient>
          <Gradient style={styles.card}>
            <Text style={styles.text}>Wrong Answers</Text>
            <Text style={styles.text}>{wrongAnswers.length}</Text>
          </Gradient>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.button, { backgroundColor: lightColor }]}>
            <Text
              onPress={() => navigate('Leaderboard')}
              style={[styles.text, { color: primaryColor }]}>
              Leaderboard
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text onPress={() => navigate('Home')} style={styles.text}>
              Home
            </Text>
          </TouchableOpacity>

          {totalPercentage <= 80 && (
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text
                onPress={() => navigate('Badges', { technology })}
                style={styles.text}>
                Try Again
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Result;

const styles = StyleSheet.create({
  logo: {
    width: width * 0.8,
    height: width * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  resultProgress: {
    width: '20%',
    alignItems: 'center',
    borderRightWidth: 2,
    borderColor: primaryColor,
  },
  resultMessage: {
    width: '80%',
    alignItems: 'center',
  },
  cardContainer: {
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
  button: {
    marginTop: 20,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: lightColor,
  },
});

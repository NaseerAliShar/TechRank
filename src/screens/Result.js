import {Button} from 'react-native-paper';
import {height, width} from '../styles/sizes';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
const Result = ({
  score,
  questions,
  wrongAnswers,
  correctAnswers,
  userSelections,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {score >= 5 ? (
        <View>
          <Image
            source={require('../../assets/images/congrats.png')}
            style={styles.resultImage}
          />
          <View style={styles.resultCard}>
            <View style={styles.resultProgress}>
              <Progress.Pie
                size={30}
                progress={score / questions.length}
                color="blue"
              />
              <Text style={{color: 'blue'}}>
                {(score / questions.length) * 100}%
              </Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={[styles.scoreMessage, {color: 'green'}]}>
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
          <Image
            source={require('../../assets/images/oops.png')}
            style={styles.resultImage}
          />
          <View style={styles.resultCard}>
            <View style={styles.resultProgress}>
              <Progress.Pie
                size={30}
                progress={score / questions.length}
                color="blue"
              />
              <Text style={{color: 'blue'}}>
                {(score / questions.length) * 100}%
              </Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={[styles.scoreMessage, {color: 'red'}]}>
                Oops! Better luck next time.
              </Text>
              <Text style={styles.scoreMessage}>
                You scored {score} out of {questions.length}
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.boxCard, {backgroundColor: '#0E81B4'}]}>
          <Text style={styles.boxText}>Total Time</Text>
          <Text style={styles.boxText}>00:00:00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.boxCard, {backgroundColor: '#F2954D'}]}>
          <Text style={styles.boxText}>Avg Time</Text>
          <Text style={styles.boxText}>00:00:00</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.boxCard, {backgroundColor: '#27AE60'}]}>
          <Text style={styles.boxText}>Correct Answers</Text>
          <Text style={styles.boxText}>{correctAnswers.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.boxCard, {backgroundColor: '#EB5757'}]}>
          <Text style={styles.boxText}>Wrong Answers</Text>
          <Text style={styles.boxText}>{wrongAnswers.length}</Text>
        </TouchableOpacity>
      </View>
      <Button
        style={styles.analyticsButton}
        mode="outlined"
        onPress={() =>
          navigation.navigate('Analytics', {
            questions,
            wrongAnswers,
            correctAnswers,
            userSelections,
          })
        }>
        <Text style={styles.analyticsButtonText}>View Analytics</Text>
      </Button>
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f4f7',
  },
  resultImage: {
    width: width * 0.8,
    height: height * 0.25,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  resultCard: {
    padding: 7,
    marginTop: 20,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultProgress: {
    borderRightWidth: 2,
    paddingVertical: 10,
    width: '20%',
    alignItems: 'center',
    borderColor: 'blue',
  },
  scoreText: {
    fontSize: 24,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  scoreMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'blue',
  },
  resultMessage: {
    paddingLeft: 14,
    width: '85%',
    alignItems: 'center',
  },
  analyticsButton: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#6200ea',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  analyticsButtonText: {
    color: '#6200ea',
    fontWeight: 'bold',
  },
  boxContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxCard: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    borderColor: '#6200ea',
  },
  boxText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

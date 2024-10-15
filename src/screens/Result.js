import {Button} from 'react-native-paper';
import {height, width} from '../styles/sizes';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Result = ({route, navigation}) => {
  const {score, totalQuestions} = route.params;
  const percentage = (score / totalQuestions) * 100;

  return (
    <View style={styles.container}>
      {percentage >= 50 ? (
        <View>
          <Image
            source={require('../../assets/images/congrats.png')}
            style={styles.resultImage}
          />
          <View style={styles.resultCard}>
            <View style={styles.resultProgress}>
              <Text style={styles.scoreText}>{score}</Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={styles.messageText}>
                Congratulations! You did great.
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
              <Text style={styles.scoreText}>{score}</Text>
            </View>
            <View style={styles.resultMessage}>
              <Text style={styles.messageText}>
                Oops! Better luck next time.
              </Text>
            </View>
          </View>
        </View>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#52c465'}]}>
          <Text>Total Time</Text>
          <Text>00:00:00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#d838d6'}]}>
          <Text>Avg Time</Text>
          <Text>00:00:00</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#40cece'}]}>
          <Text>Correct Answers</Text>
          <Text>{score}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, {backgroundColor: '#c4b638'}]}>
          <Text>Wrong Answers</Text>
          <Text>{totalQuestions - score}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.percentageText}>
        Percentage: {percentage.toFixed(2)}%
      </Text>
      <Button
        style={styles.analyticsButton}
        mode="outlined"
        onPress={() => navigation.navigate('Answers')}>
        <Text>Check Answers</Text>
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
  },
  resultImage: {
    width: width * 0.8,
    height: height * 0.2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  resultCard: {
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3e5f5',
  },
  resultProgress: {
    borderRightWidth: 2,
    paddingVertical: 10,
    width: '15%',
    alignItems: 'center',
    borderColor: '#6200ea',
  },
  scoreText: {
    fontSize: 18,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  resultMessage: {
    paddingLeft: 15,
    width: '85%',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    color: '#333',
  },
  percentageText: {
    fontSize: 15,
    color: '#6200ea',
    marginTop: 15,
  },
  analyticsButton: {
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#6200ea',
  },
  buttons: {
    marginTop: 30,
    paddingHorizontal: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#6200ea',
  },
});

import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Snackbar, Button} from 'react-native-paper';
import Icons from 'react-native-vector-icons/SimpleLineIcons';

const Results = () => {
  const navigation = useNavigation();
  const [visiblesnake, setVisiblesnake] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(StackActions.replace('Home'))}>
            <View style={styles.backButton}>
              <Icons name="arrow-left" size={20} color={'#FFF'} />
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Results</Text>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            Pair of Linear Equation in Two Variables
          </Text>
          <Text style={styles.resultSubtitle}>Ms Office / Module 1</Text>
        </View>

        <View style={styles.scoreBox}>
          <View>{/* Add your progress activity indicator here */}</View>
          <View style={styles.resultTextBox}>
            <Text style={styles.resultText}>
              Congratulations! You have{' '}
              <Text style={styles.failedText}>failed</Text> this test with{' '}
              <Text style={styles.scoreText}>20%.</Text>
            </Text>
          </View>
        </View>

        <View style={styles.scoreSummary}>
          <View style={[styles.scoreItem, {backgroundColor: '#27AE60'}]}>
            <Text style={styles.scoreItemText}>0</Text>
            <Text style={styles.scoreItemLabel}>Correct Answers</Text>
          </View>
          <View style={[styles.scoreItem, {backgroundColor: '#EB5757'}]}>
            <Text style={styles.scoreItemText}>0</Text>
            <Text style={styles.scoreItemLabel}>Wrong Answers</Text>
          </View>
        </View>

        <View style={styles.timeSummary}>
          <View style={[styles.timeItem, {backgroundColor: '#0E81B4'}]}>
            <Icons name="clock" size={20} color={'#f2f2f2'} />
            <Text style={styles.timeText}>14 Mins</Text>
            <Text style={styles.timeLabel}>Total Time</Text>
          </View>
          <View style={[styles.timeItem, {backgroundColor: '#F2954D'}]}>
            <Icons name="hourglass" size={20} color={'#f2f2f2'} />
            <Text style={styles.timeText}>2 Mins</Text>
            <Text style={styles.timeLabel}>Avg. Time/Answer</Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#1A5873'}]}>
            <Text style={styles.buttonText}>Check Answers</Text>
          </TouchableOpacity>
          <Button
            icon="reload"
            mode="contained"
            style={[
              styles.button,
              {backgroundColor: '#0E81B4', borderWidth: 0},
            ]}>
            Try Quiz Again
          </Button>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>Quiz Ended</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.dispatch(StackActions.replace('Home'))}>
            <View style={styles.exitButton}>
              <Text style={styles.exitText}>Exit</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Snackbar
        duration={1000000000}
        onDismiss={() => setVisiblesnake(false)}
        action={{label: 'close', onPress: () => setVisiblesnake(false)}}
        style={{
          position: 'absolute',
          bottom: Dimensions.get('screen').height / 1.2,
        }}
        visible={visiblesnake}>
        Your Quiz Automatically Submitted Because You Minimized/Closed this app
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#273032',
  },
  header: {
    flex: 2,
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#162023',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: '#2F3739',
    borderRadius: 8,
  },
  headerTitle: {
    margin: 10,
    fontSize: 20,
    color: '#fff',
  },
  resultBox: {
    width: '100%',
    height: 101,
    backgroundColor: '#162023',
    marginTop: '2%',
    marginBottom: '4%',
    borderWidth: 1,
    borderColor: '#2F3739',
    elevation: 5,
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 16,
    color: '#f2f2f2',
    lineHeight: 25,
  },
  resultSubtitle: {
    color: '#f2f2f2',
    opacity: 0.7,
  },
  scoreBox: {
    width: '100%',
    height: 150,
    backgroundColor: '#162023',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2F3739',
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTextBox: {
    width: '50%',
  },
  resultText: {
    color: '#f2f2f2',
    fontSize: 18,
    textAlign: 'center',
  },
  failedText: {
    color: 'lightgreen',
  },
  scoreText: {
    color: '#0E81B4',
  },
  scoreSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  scoreItem: {
    width: '45%',
    height: 74,
    borderRadius: 16,
    padding: 10,
  },
  scoreItemText: {
    color: '#f2f2f2',
    fontSize: 20,
  },
  scoreItemLabel: {
    color: '#f2f2f2',
    fontSize: 15,
  },
  timeSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '45%',
    borderRadius: 16,
    padding: 10,
    height: 98,
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 20,
    color: '#f2f2f2',
  },
  timeLabel: {
    fontSize: 15,
    color: '#f2f2f2',
  },
  buttonGroup: {
    width: '100%',
    marginVertical: 20,
  },
  button: {
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#f2f2f2',
  },
  footer: {
    width: '100%',
  },
  footerContent: {
    height: 76,
    backgroundColor: '#162023',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#f2f2f2',
    fontSize: 20,
  },
  exitButton: {
    width: 56,
    height: 46,
    backgroundColor: '#0E81B4',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitText: {
    fontSize: 15,
    color: '#f2f2f2',
    fontWeight: 'bold',
  },
});

export default Results;

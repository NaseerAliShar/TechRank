import {
  backgroundColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { List, Text } from 'react-native-paper';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';

const Help = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <LinearGradient colors={backgroundColor} style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={{ transform: [{ scale: 1.5 }] }}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.innerContent}>
            <List.Section>
              <List.Accordion
                title="How to start a quiz?"
                expanded={expanded}
                onPress={handlePress}
                style={styles.accordion}
                left={props => <List.Icon {...props} icon="help-circle" />}>
                <Text style={styles.text}>
                  To start a quiz, navigate to the 'All Quizzes' section, select
                  a quiz, and tap on the 'Start Quiz' button.
                </Text>
              </List.Accordion>

              <List.Accordion
                title="How are scores calculated?"
                style={styles.accordion}
                left={props => <List.Icon {...props} icon="calculator" />}>
                <Text style={styles.text}>
                  Scores are calculated based on correct answers. In MultiSelect
                  questions, all correct options must be selected with no
                  incorrect choices for a point.
                </Text>
              </List.Accordion>

              <List.Accordion
                title="What is the time limit for each quiz?"
                style={styles.accordion}
                left={props => <List.Icon {...props} icon="timer" />}>
                <Text style={styles.text}>
                  The time limit varies for each quiz and is displayed on the
                  quiz details screen before starting.
                </Text>
              </List.Accordion>

              <List.Accordion
                title="How to review the quiz results?"
                style={styles.accordion}
                left={props => <List.Icon {...props} icon="eye" />}>
                <Text style={styles.text}>
                  After completing a quiz, you can review your results, see
                  correct answers, and compare your score with the maximum
                  possible score.
                </Text>
              </List.Accordion>
            </List.Section>
          </View>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: '100%',
  },
  innerContent: {
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: secondaryColor,
    height: '100%',
  },
  accordion: {
    marginBottom: 10,
    backgroundColor: primaryColor,
  },
  text: {
    fontSize: 16,
    color: primaryColor,
  },
});

export default Help;

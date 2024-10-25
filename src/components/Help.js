import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

const Help = () => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <List.Section>
          <List.Accordion
            title="How to start a quiz?"
            expanded={expanded}
            onPress={handlePress}
            left={props => <List.Icon {...props} icon="help-circle" />}>
            <Text style={styles.text}>
              To start a quiz, navigate to the 'All Quizzes' section, select a
              quiz, and tap on the 'Start Quiz' button.
            </Text>
          </List.Accordion>

          <List.Accordion
            title="How are scores calculated?"
            left={props => <List.Icon {...props} icon="calculator" />}>
            <Text style={styles.text}>
              Scores are calculated based on correct answers. In MultiSelect
              questions, all correct options must be selected with no incorrect
              choices for a point.
            </Text>
          </List.Accordion>

          <List.Accordion
            title="What is the time limit for each quiz?"
            left={props => <List.Icon {...props} icon="timer" />}>
            <Text style={styles.text}>
              The time limit varies for each quiz and is displayed on the quiz
              details screen before starting.
            </Text>
          </List.Accordion>

          <List.Accordion
            title="How to review the quiz results?"
            left={props => <List.Icon {...props} icon="eye" />}>
            <Text style={styles.text}>
              After completing a quiz, you can review your results, see correct
              answers, and compare your score with the maximum possible score.
            </Text>
          </List.Accordion>
        </List.Section>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  text: {
    padding: 16,
    color: '#555',
  },
});

export default Help;

import React, { useState } from 'react';
import { width } from '../styles/sizes';
import { Text } from 'react-native-paper';
import Container from '../components/Container';
import { lightColor, primaryColor, secondaryColor } from '../styles/colors';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';

const Help = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const handlePress = index =>
    setExpandedIndex(index === expandedIndex ? null : index);

  const data = [
    {
      title: 'How to start a quiz?',
      content:
        "To start a quiz, navigate to the 'All Quizzes' section, select a quiz, and tap on the 'Start Quiz' button.",
    },
    {
      title: 'How are scores calculated?',
      content:
        'Scores are based on correct answers, requiring all correct options in MultiSelect questions without incorrect choices.',
    },
    {
      title: 'What is the time limit for each quiz?',
      content:
        'The time limit varies for each quiz and is shown on the quiz details screen before starting.',
    },
    {
      title: 'How to review the quiz results?',
      content:
        'After completing a quiz, you can review your results, see correct answers, and compare your score with the maximum possible score.',
    },
  ];

  return (
    <Container>
      <View
        style={{
          padding: 10,
          borderRadius: 10,
          height: width / 4,
          marginVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
          backgroundColor: lightColor,
        }}></View>
      <View style={styles.container}>
        <ScrollView>
          {data.map((item, index) => (
            <View key={index} style={styles.accordion}>
              <TouchableOpacity
                onPress={() => handlePress(index)}
                style={styles.header}>
                <Text style={styles.headerText}>{item.title}</Text>
              </TouchableOpacity>
              {expandedIndex === index && (
                <View style={styles.content}>
                  <Text style={styles.contentText}>{item.content}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: lightColor,
  },
  accordion: {
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  header: {
    padding: 20,
    backgroundColor: primaryColor,
  },
  headerText: {
    fontSize: 18,
    color: lightColor,
    fontWeight: '400',
  },
  content: {
    padding: 10,
    backgroundColor: secondaryColor,
  },
  contentText: {
    fontSize: 15,
    color: lightColor,
  },
});

export default Help;

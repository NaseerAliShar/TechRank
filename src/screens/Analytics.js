import { width } from '../styles/sizes';
import Header from '../components/Header';
import { Card } from 'react-native-paper';
import Container from '../components/Container';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { lightColor, primaryColor } from '../styles/colors';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const Answers = ({ route }) => {
  const { questions, wrongAnswers, correctAnswers, userSelections } =
    route.params;

  // Function to determine if a question is correct or wrong
  const getQuestionStatus = questionId => {
    if (correctAnswers.some(q => q._id === questionId)) {
      return 'correct';
    }
    if (wrongAnswers.some(q => q._id === questionId)) {
      return 'wrong';
    }
    return 'unattempted';
  };

  const renderItem = ({ item }) => {
    const status = getQuestionStatus(item._id);
    const iconName =
      status === 'correct'
        ? 'check-circle'
        : status === 'wrong'
        ? 'cancel'
        : null;
    const iconColor =
      status === 'correct'
        ? '#4caf50'
        : status === 'wrong'
        ? '#f44336'
        : '#9e9e9e';

    return (
      <Card style={styles.card}>
        <View style={{ padding: 10 }}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{item.questionText}</Text>
            {iconName && (
              <Icon
                size={24}
                name={iconName}
                color={iconColor}
                style={styles.statusIcon}
              />
            )}
          </View>
          {item.options.map((option, _) => {
            let textColor = '#000'; // Default text color
            let backgroundColor = '#eaf0f8'; // Default background color for answers

            // Check if the option is included in any of the userSelections
            const isSelected = userSelections.some(
              selection =>
                selection &&
                selection.some(
                  selected => selected && selected._id === option._id,
                ),
            );

            if (option.isCorrect && isSelected) {
              textColor = 'blue'; // Correct option that was selected
              backgroundColor = '#cce5ff'; // Light blue background for correct answer
            } else if (option.isCorrect) {
              textColor = 'green'; // Correct option that was not selected
              backgroundColor = '#d4edda'; // Light green background for correct answer
            } else if (!option.isCorrect && isSelected) {
              textColor = 'red'; // Incorrect option that was selected
              backgroundColor = '#f8d7da'; // Light red background for wrong answer
            }

            return (
              <View
                key={option._id}
                style={[styles.optionContainer, { backgroundColor }]}>
                <Text style={{ color: textColor }}>{option.text}</Text>
              </View>
            );
          })}
        </View>
      </Card>
    );
  };

  return (
    <Container>
      <Header title="Analytics" />
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
        <FlatList
          data={questions}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id.toString()}
        />
      </View>
    </Container>
  );
};

export default Answers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: lightColor,
  },
  card: {
    shadowRadius: 1,
    shadowOpacity: 1,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: primaryColor,
    backgroundColor: 'lemonchiffon',
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    flex: 1,
    fontSize: 15,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: primaryColor,
  },
  optionContainer: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

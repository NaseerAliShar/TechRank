import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Answers = () => {
  return (
    <View style={styles.container}>
      <Text>Answers</Text>
    </View>
  );
};

export default Answers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

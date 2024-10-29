import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Header = ({ title }) => {
  return (
    <View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

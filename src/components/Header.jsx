import React from 'react';
import { lightColor } from '../styles/colors';
import { StyleSheet, Text, View } from 'react-native';

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
    color: lightColor,
    fontWeight: 'bold',
  },
});

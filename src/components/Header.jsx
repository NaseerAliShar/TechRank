import React from 'react';
import { lightColor } from '../styles/colors';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Header = ({ title, icon, OnPress }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={25} color={lightColor} />
      </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity onPress={OnPress}>
        <AntDesign name={icon || null} size={25} color={lightColor} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    color: lightColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

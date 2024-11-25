import React from 'react';
import Container from './Container';
import { primaryColor } from '../styles/colors';
import { StyleSheet, Text } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Animated, { ZoomIn } from 'react-native-reanimated';

const Loader = () => {
  return (
    <Container>
      <Animated.View entering={ZoomIn} style={styles.loadingContainer}>
        <ActivityIndicator size={50} color={primaryColor} />
        <Text style={styles.loadingText}>Loading...</Text>
      </Animated.View>
    </Container>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 15,
    marginTop: 10,
    fontWeight: 'bold',
    color: primaryColor,
  },
});

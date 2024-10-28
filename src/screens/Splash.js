import React, { useEffect } from 'react';
import Container from '../components/Container';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from '../styles/sizes';
import { Divider } from 'react-native-paper';
import { Image, StyleSheet, Text, View } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (!token || !user) {
        navigation.replace('Login');
      } else {
        navigation.replace('Tab');
      }
    }, 5000);
  }, []);

  return (
    <Container>
      <Animatable.View
        animation="fadeIn"
        duration={2000}
        style={styles.container}>
        <Animatable.View
          animation="fadeInUp"
          duration={2000}
          style={styles.topContainer}>
          <Image
            style={styles.techrankLogo}
            source={require('../../assets/images/techrank1.png')}
          />
        </Animatable.View>
        <View style={styles.bottomContainer}>
          <Animatable.View animation="fadeInUp" delay={1000}>
            <View style={styles.textContainer}>
              <Divider style={styles.divider} />
              <Text style={styles.text}>Powered by</Text>
              <Divider style={styles.divider} />
            </View>
          </Animatable.View>
          <Animatable.View animation="zoomIn" delay={1500}>
            <Image
              source={require('../../assets/images/innovador1.png')}
              style={styles.innovadorLogo}
            />
          </Animatable.View>
        </View>
      </Animatable.View>
    </Container>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  techrankLogo: {
    width: width,
    height: width,
    resizeMode: 'contain',
  },
  bottomContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  innovadorLogo: {
    width: width * 0.2,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
  },
  divider: {
    width: width * 0.3,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
});

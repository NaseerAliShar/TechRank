import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from '../styles/sizes';
import { Divider } from 'react-native-paper';
import { backgroundColor } from '../styles/colors';
import { Image, StyleSheet, Text, View, ImageBackground } from 'react-native';

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
    <LinearGradient colors={backgroundColor} style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        imageStyle={{ transform: [{ scale: 1.5 }] }}
        style={styles.container}>
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
      </ImageBackground>
    </LinearGradient>
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
    fontSize: 16,
  },
  divider: {
    width: width * 0.3,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
});

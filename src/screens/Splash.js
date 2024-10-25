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
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={backgroundColor}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        style={styles.container}
        imageStyle={{ transform: [{ scale: 1.5 }] }}>
        <Animatable.View
          animation="fadeIn"
          duration={2000}
          style={styles.container}>
          <View style={styles.techrankContainer}>
            <Animatable.View animation="fadeInUp" duration={2000}>
              <Image
                style={styles.techrankLogo}
                source={require('../../assets/images/techrank1.png')}
                resizeMode="contain"
              />
            </Animatable.View>
          </View>

          <View style={styles.footerContainer}>
            <Animatable.View animation="fadeInUp" delay={1000}>
              <View style={styles.poweredByContainer}>
                <Divider style={styles.divider} />
                <Text style={{ color: '#fff' }}>Powered by</Text>
                <Divider style={styles.divider} />
              </View>
            </Animatable.View>

            <Animatable.View animation="zoomIn" delay={1500}>
              <Image
                source={require('../../assets/images/innovador1.png')}
                style={styles.innovadorLogo}
                resizeMode="contain"
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  techrankContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  techrankLogo: {
    width: width,
    height: width,
  },
  footerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  poweredByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innovadorLogo: {
    width: width * 0.2,
    height: width * 0.1,
  },
  divider: {
    width: width * 0.3,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
});

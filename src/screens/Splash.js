import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from '../styles/sizes';
import { Divider } from 'react-native-paper';
import { black, white } from '../styles/colors';
import { Image, StyleSheet, Text, View } from 'react-native';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
      } else {
        navigation.replace('Drawer');
      }
    }, 3000);
  }, []);

  return (
    <Animatable.View
      animation="fadeIn"
      duration={2000}
      style={styles.container}>
      <Animatable.View animation="fadeInUp" duration={2000}>
        <Image
          style={styles.techrankLogo}
          source={require('../../assets/images/techrank1.png')}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1000}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Divider horizontal={true} style={styles.divider} />
          <Text style={{ color: white, marginHorizontal: 10 }}>Powered by</Text>
          <Divider horizontal={true} style={styles.divider} />
        </View>
      </Animatable.View>

      <Animatable.View animation="zoomIn" delay={1500}>
        <Image
          source={require('../../assets/images/innovador1.png')}
          style={styles.innovadorLogo}
        />
      </Animatable.View>
    </Animatable.View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
  },
  techrankLogo: {
    width: width,
    height: width * 0.8,
    resizeMode: 'contain',
  },
  innovadorLogo: {
    marginTop: 5,
    width: width * 0.3,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  divider: {
    marginTop: 10,
    width: width * 0.3,
    height: width * 0.001,
    backgroundColor: white,
  },
});

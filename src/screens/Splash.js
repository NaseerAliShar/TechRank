import { width } from '../styles/sizes';
import React, { useEffect } from 'react';
import { Divider } from 'react-native-paper';
import Container from '../components/Container';
import * as Animatable from 'react-native-animatable';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({ navigation }) => {
  useEffect(() => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        navigation.replace('Login');
      } else {
        navigation.replace('Tab');
      }
    }, 5000);
  }, []);

  return (
    <Container>
      <Animatable.View animation="fadeIn" duration={2000} style={{ flex: 1 }}>
        <Animatable.View
          animation="fadeInUp"
          duration={2000}
          style={styles.container}>
          <Image
            style={styles.wwrLogo}
            source={require('../../assets/images/logo1.png')}
          />
        </Animatable.View>
        <View style={styles.footerContainer}>
          <Animatable.View animation="fadeInUp" delay={1000}>
            <View style={styles.footer}>
              <Divider style={styles.divider} />
              <Text style={{ color: '#fff' }}>Powered by</Text>
              <Divider style={styles.divider} />
            </View>
          </Animatable.View>
          <Animatable.View animation="zoomIn" delay={1500}>
            <Image
              source={require('../../assets/images/innovador1.png')}
              style={styles.isLogo}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  wwrLogo: {
    height: width,
    width: width / 1.5,
    resizeMode: 'contain',
  },
  footerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: width * 0.3,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  isLogo: {
    width: width * 0.2,
    height: width * 0.1,
    resizeMode: 'contain',
  },
});

import { useEffect } from 'react';
import { width } from '../styles/sizes';
import { Divider } from 'react-native-paper';
import Container from '../components/Container';
import * as Animatable from 'react-native-animatable';
import { darkColor, primaryColor } from '../styles/colors';
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
    }, 3000);
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
            source={require('../../assets/images/logo.png')}
          />
        </Animatable.View>
        <View style={{ alignItems: 'center' }}>
          <Animatable.View animation="fadeInUp" delay={1000}>
            <View style={styles.footer}>
              <Divider style={styles.divider} />
              <Text style={{ color: darkColor }}>Powered by</Text>
              <Divider style={styles.divider} />
            </View>
          </Animatable.View>
          <Animatable.View animation="zoomIn" delay={1500}>
            <Image
              source={require('../../assets/images/innovador2.png')}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  wwrLogo: {
    width: width / 2,
    resizeMode: 'contain',
  },
  innovadorLogo: {
    height: width / 14,
    resizeMode: 'contain',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    width: width / 3,
    marginHorizontal: 5,
    backgroundColor: primaryColor,
  },
});

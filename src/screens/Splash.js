import React, {useEffect} from 'react';
import {Divider} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import {Image, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
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
          style={styles.techrank}
          source={require('../../assets/images/techrank1.png')}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={1000}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Divider horizontal={true} style={styles.divider} />
          <Text style={{color: '#eee', marginHorizontal: 10}}>Powered by</Text>
          <Divider horizontal={true} style={styles.divider} />
        </View>
      </Animatable.View>

      <Animatable.View animation="zoomIn" delay={1500}>
        <Image
          source={require('../../assets/images/innovador1.png')}
          style={styles.innovador}
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
    backgroundColor: '#000',
  },
  techrank: {
    width: 400,
    height: 300,
    resizeMode: 'contain',
  },
  innovador: {
    height: 50,
    width: 120,
    resizeMode: 'contain',
  },
  divider: {
    height: 1,
    width: '30%',
    marginTop: 10,
    backgroundColor: '#eee',
  },
});

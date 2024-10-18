import axios from 'axios';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { width } from '../styles/sizes';
import { TextInput, Button } from 'react-native-paper';
import { black, white, primary } from '../styles/colors';
import { TouchableOpacity, ScrollView, Image, Text, View } from 'react-native';

const Login = ({ navigation }) => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async values => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://p3x08xsn-3000.inc1.devtunnels.ms/api/v1/auth/login',
        values,
      );
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      navigation.replace('Drawer');
      setLoading(false);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/techrank1.png')}
        style={{ height: width * 0.6, width: width }}
        resizeMode="contain"
      />

      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => handleLogin(values)}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                mode="flat"
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{ backgroundColor: white, marginVertical: 10 }}
                activeUnderlineColor="#379237"
                underlineColor="transparent"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                mode="flat"
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={{ backgroundColor: white, marginVertical: 10 }}
                activeUnderlineColor="#379237"
                underlineColor="transparent"
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={eye}
                right={
                  <TextInput.Icon
                    icon={eye ? 'eye' : 'eye-off'}
                    onPress={() => setEye(!eye)}
                  />
                }
              />
              <Button
                mode="contained"
                loading={loading}
                onPress={handleSubmit}
                style={{ marginVertical: 10 }}
                buttonColor={primary}
                textColor={white}>
                {!loading && 'Login'}
              </Button>
            </>
          )}
        </Formik>

        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginVertical: 20,
          }}>
          <Text style={{ fontSize: 16, color: 'gray' }}>or sign in with</Text>
        </View>

        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/google.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../assets/images/facebook.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../assets/images/linkedin.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black,
  },
  icon: {
    width: width * 0.1,
    height: width * 0.2,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
};

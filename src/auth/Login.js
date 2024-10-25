import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { width } from '../styles/sizes';
import { TextInput, Button } from 'react-native-paper';
import { primaryColor, textColor, backgroundColor } from '../styles/colors';

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
      navigation.replace('Tab');
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message || 'Login failed', [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.', [
          { text: 'OK' },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  return (
    <LinearGradient
      colors={backgroundColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/images/bgImage.png')}
        style={styles.container}
        imageStyle={{ transform: [{ scale: 1.5 }] }}>
        <Image
          source={require('../../assets/images/techrank1.png')}
          style={{ width: width * 0.7, height: width * 0.7 }}
          resizeMode="contain"
        />
        <ScrollView
          style={{ width: width * 0.9 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={values => {
              Keyboard.dismiss();
              handleLogin(values);
            }}>
            {({
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              values,
              errors,
            }) => (
              <View>
                <TextInput
                  mode="flat"
                  label="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={touched.email && errors.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  mode="flat"
                  label="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  autoCapitalize="words"
                  secureTextEntry={eye}
                  right={
                    <TextInput.Icon
                      icon={eye ? 'eye' : 'eye-off'}
                      onPress={() => setEye(!eye)}
                    />
                  }
                  error={touched.password && errors.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                  <Text style={{ color: primaryColor }}>Forget Password</Text>
                </TouchableOpacity>
                <Button
                  mode="contained"
                  loading={loading}
                  onPress={handleSubmit}
                  style={{
                    borderRadius: 30,
                    marginTop: 15,
                  }}
                  labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
                  buttonColor={primaryColor}
                  textColor={textColor}>
                  {!loading && 'Login'}
                </Button>
              </View>
            )}
          </Formik>
          <TouchableOpacity style={{ alignSelf: 'center', paddingTop: 10 }}>
            <Text style={{ color: 'gray' }}>
              Don't have an account?{' '}
              <Text
                style={{ color: primaryColor }}
                onPress={() => navigation.navigate('Register')}>
                Register
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.socialLoginContainer}>
            <Text style={styles.socialLoginText}>or sign in with</Text>
          </View>

          <View style={styles.socialIconsContainer}>
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
      </ImageBackground>
    </LinearGradient>
  );
};

export default Login;

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginBottom: 5,
  },
  socialLoginContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialLoginText: {
    fontSize: 16,
    color: 'gray',
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.1,
    height: width * 0.1,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
};

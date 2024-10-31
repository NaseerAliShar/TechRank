import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  darkColor,
  lightColor,
  primaryColor,
  secondaryColor,
} from '../styles/colors';
import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import Container from '../components/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { width } from '../styles/sizes';
import { TextInput, Button } from 'react-native-paper';

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
      const message = error.response?.data?.message || 'Login failed';
      Alert.alert('Error', message, [{ text: 'OK' }]);
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
    <Container>
      <Image
        source={require('../../assets/images/techrank1.png')}
        style={styles.logo}
      />
      <View style={styles.container}>
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                label="Email"
                mode="outlined"
                value={values.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                style={styles.input}
                keyboardType="email-address"
                activeOutlineColor={primaryColor}
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                label="Password"
                mode="outlined"
                value={values.password}
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                style={styles.input}
                secureTextEntry={eye}
                activeOutlineColor={primaryColor}
                error={touched.password && errors.password}
                right={
                  <TextInput.Icon
                    icon={eye ? 'eye' : 'eye-off'}
                    onPress={() => setEye(!eye)}
                  />
                }
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                mode="contained"
                loading={loading}
                onPress={handleSubmit}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                buttonColor={primaryColor}>
                {!loading && 'Login'}
              </Button>

              <View style={styles.textContainer}>
                <Text style={styles.text}>
                  Don't have an account?{' '}
                  <Text
                    style={styles.linkText}
                    onPress={() => navigation.navigate('Register')}>
                    Register
                  </Text>
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text>or sign in with</Text>
                <View style={styles.iconsContainer}>
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
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>By continuing, you agree to our</Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Terms and Conditions</Text>
                </TouchableOpacity>
                <Text style={styles.text}> and </Text>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
      </View>
    </Container>
  );
};

export default Login;

const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: secondaryColor,
  },
  logo: {
    width: width * 0.8,
    height: width * 0.6,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  input: {
    marginTop: 10,
    backgroundColor: lightColor,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
  },
  forgotPassword: {
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  button: {
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  text: {
    color: darkColor,
  },
  linkText: {
    color: primaryColor,
    fontWeight: 'bold',
  },
  iconsContainer: {
    gap: 15,
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
};

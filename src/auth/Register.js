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

const Register = ({ navigation }) => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async values => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://yourapiurl.com/api/v1/auth/register',
        values,
      );
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      navigation.replace('Login'); // Replace 'Tab' with the correct screen after registration
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert(
          'Error',
          error.response.data.message || 'Registration failed',
          [{ text: 'OK' }],
        );
      } else {
        Alert.alert('Error', 'An error occurred. Please try again later.', [
          { text: 'OK' },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const registrationValidationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    mobile: Yup.string().required('Mobile number is required'),
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
          style={{ width: width * 0.7, height: width * 0.4 }}
          resizeMode="contain"
        />
        <ScrollView
          style={{ width: width * 0.9 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{
              fullName: '',
              country: '',
              city: '',
              mobile: '',
              email: '',
              password: '',
            }}
            validationSchema={registrationValidationSchema}
            onSubmit={values => {
              Keyboard.dismiss();
              handleRegister(values);
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
                  label="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  value={values.fullName}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  error={touched.fullName && errors.fullName}
                />
                {touched.fullName && errors.fullName && (
                  <Text style={styles.errorText}>{errors.fullName}</Text>
                )}
                <TextInput
                  mode="flat"
                  label="Country"
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  value={values.country}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  error={touched.country && errors.country}
                />
                {touched.country && errors.country && (
                  <Text style={styles.errorText}>{errors.country}</Text>
                )}
                <TextInput
                  mode="flat"
                  label="City"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  error={touched.city && errors.city}
                />
                {touched.city && errors.city && (
                  <Text style={styles.errorText}>{errors.city}</Text>
                )}
                <TextInput
                  mode="flat"
                  label="Mobile"
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  value={values.mobile}
                  style={styles.input}
                  activeUnderlineColor="#379237"
                  underlineColor="transparent"
                  keyboardType="phone-pad"
                  error={touched.mobile && errors.mobile}
                />
                {touched.mobile && errors.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}
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

                <Button
                  mode="contained"
                  loading={loading}
                  onPress={handleSubmit}
                  style={{
                    borderRadius: 30,
                    marginTop: 10,
                  }}
                  labelStyle={{ fontWeight: 'bold', fontSize: 18 }}
                  buttonColor={primaryColor}
                  textColor={textColor}>
                  {!loading && 'Register'}
                </Button>
              </View>
            )}
          </Formik>

          <TouchableOpacity style={{ alignSelf: 'center', paddingTop: 10 }}>
            <Text style={{ color: 'gray' }}>
              Already have an account?{' '}
              <Text
                style={{ color: primaryColor }}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};

export default Register;

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
};

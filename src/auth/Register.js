import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import { width } from '../styles/sizes';
import { TextInput, Button } from 'react-native-paper';
import { primaryColor, secondaryColor } from '../styles/colors';
import Container from '../components/Container';

const Register = ({ navigation }) => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async values => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://p3x08xsn-3000.inc1.devtunnels.ms/api/v1/auth/register',
        values,
      );
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      navigation.replace('Login');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      Alert.alert('Error', message, [{ text: 'OK' }]);
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
    <Container>
      <Image
        source={require('../../assets/images/techrank1.png')}
        style={styles.logo}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ marginHorizontal: 20 }}>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            country: '',
            city: '',
            mobile: '',
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
                activeUnderlineColor={primaryColor}
                error={touched.fullName && errors.fullName}
              />
              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>{errors.fullName}</Text>
              )}
              <TextInput
                mode="flat"
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={styles.input}
                activeUnderlineColor={primaryColor}
                keyboardType="email-address"
                autoCapitalize="none"
                error={touched.email && errors.email}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                mode="flat"
                label="Country"
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                value={values.country}
                style={styles.input}
                activeUnderlineColor={primaryColor}
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
                activeUnderlineColor={primaryColor}
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
                activeUnderlineColor={primaryColor}
                keyboardType="phone-pad"
                error={touched.mobile && errors.mobile}
              />
              {touched.mobile && errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
              <TextInput
                mode="flat"
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={styles.input}
                activeUnderlineColor={primaryColor}
                secureTextEntry={eye}
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
              <Button
                mode="contained"
                loading={loading}
                onPress={handleSubmit}
                style={styles.button}
                labelStyle={styles.buttonLabel}
                buttonColor={primaryColor}
                textColor={secondaryColor}>
                {!loading && 'Register'}
              </Button>
            </View>
          )}
        </Formik>

        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.text}>
            Already have an account?{' '}
            <Text
              style={{ color: primaryColor }}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

export default Register;

const styles = {
  logo: {
    width: width * 0.8,
    height: width * 0.4,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  input: {
    marginTop: 15,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  textContainer: {
    marginBottom: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 15,
    color: 'gray',
  },
  button: {
    marginVertical: 10,
  },
  buttonLabel: {
    fontWeight: 'bold',
    fontSize: 18,
  },
};

import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  Platform,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { width } from '../styles/sizes';
import { useStore } from '../store/store';
import { Container } from '../components/index';
import { instance } from '../services/services';
import { apiURL, apiVersion } from '../config/config';
import { TextInput, Button } from 'react-native-paper';
import { navigate, replace } from '../utils/navigation';
import { lightColor, primaryColor } from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setUser } = useStore(state => state);

  const handleLogin = async values => {
    setLoading(true);
    try {
      const { data } = await instance.post(
        `${apiURL}/${apiVersion}/auth/login`,
        values,
      );
      await AsyncStorage.setItem('token', data.token);
      setUser(data.user);
      replace('Tab');
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
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
                  autoCapitalize="none"
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

                <TouchableOpacity
                  style={styles.forgotPassword}
                  activeOpacity={0.8}>
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
                      onPress={() => navigate('Register')}>
                      Register
                    </Text>
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  <Text>or sign in with</Text>
                  <View style={styles.iconsContainer}>
                    <TouchableOpacity activeOpacity={0.8}>
                      <Image
                        source={require('../../assets/images/google.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                      <Image
                        source={require('../../assets/images/facebook.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                      <Image
                        source={require('../../assets/images/linkedin.png')}
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.textContainer}>
                  <Text>By continuing, you agree to our</Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.linkText}>Terms and Conditions</Text>
                  </TouchableOpacity>
                  <Text> and </Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Login;

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  logo: {
    width: width / 2,
    height: width / 2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  input: {
    marginTop: 10,
    backgroundColor: lightColor,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    marginVertical: 10,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  textContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    color: primaryColor,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 15,
  },
  icon: {
    width: width * 0.1,
    height: width * 0.1,
    resizeMode: 'contain',
  },
};

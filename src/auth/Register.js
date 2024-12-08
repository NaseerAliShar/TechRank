import {
  View,
  Text,
  Image,
  Alert,
  Keyboard,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useState } from 'react';
import { width } from '../styles/sizes';
import { instance } from '../services/services';
import { apiURL, apiVersion } from '../config/config';
import { TextInput, Button } from 'react-native-paper';
import { navigate, replace } from '../utils/navigation';
import { lightColor, primaryColor } from '../styles/colors';
import { Container, SubContainer } from '../components/index';

const Register = () => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async values => {
    setLoading(true);
    try {
      await instance.post(`${apiURL}/${apiVersion}/auth/register`, values);
      replace('Login');
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      Alert.alert('Error', message, [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  const registrationValidationSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is required'),
    lname: Yup.string().required('Last Name is required'),
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
        source={require('../../assets/images/wwrLogo.png')}
        style={styles.logo}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <SubContainer>
              <Formik
                initialValues={{
                  fname: '',
                  lname: '',
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
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{ width: '48%' }}>
                        <TextInput
                          label="First Name"
                          mode="outlined"
                          value={values.fname}
                          onBlur={handleBlur('fname')}
                          onChangeText={handleChange('fname')}
                          style={styles.input}
                          activeOutlineColor={primaryColor}
                          error={touched.fname && errors.fname}
                        />
                        {touched.fname && errors.fname && (
                          <Text style={styles.errorText}>{errors.fname}</Text>
                        )}
                      </View>
                      <View style={{ width: '48%' }}>
                        <TextInput
                          label="Last Name"
                          mode="outlined"
                          value={values.lname}
                          onBlur={handleBlur('lname')}
                          onChangeText={handleChange('lname')}
                          style={styles.input}
                          activeOutlineColor={primaryColor}
                          error={touched.lname && errors.lname}
                        />
                        {touched.lname && errors.lname && (
                          <Text style={styles.errorText}>{errors.lname}</Text>
                        )}
                      </View>
                    </View>

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
                      label="Country"
                      mode="outlined"
                      value={values.country}
                      onBlur={handleBlur('country')}
                      onChangeText={handleChange('country')}
                      style={styles.input}
                      activeOutlineColor={primaryColor}
                      error={touched.country && errors.country}
                    />
                    {touched.country && errors.country && (
                      <Text style={styles.errorText}>{errors.country}</Text>
                    )}

                    <TextInput
                      label="City"
                      mode="outlined"
                      value={values.city}
                      onBlur={handleBlur('city')}
                      onChangeText={handleChange('city')}
                      style={styles.input}
                      activeOutlineColor={primaryColor}
                      error={touched.city && errors.city}
                    />
                    {touched.city && errors.city && (
                      <Text style={styles.errorText}>{errors.city}</Text>
                    )}

                    <TextInput
                      label="Mobile"
                      mode="outlined"
                      value={values.mobile}
                      onBlur={handleBlur('mobile')}
                      onChangeText={handleChange('mobile')}
                      style={styles.input}
                      keyboardType="phone-pad"
                      activeOutlineColor={primaryColor}
                      error={touched.mobile && errors.mobile}
                    />
                    {touched.mobile && errors.mobile && (
                      <Text style={styles.errorText}>{errors.mobile}</Text>
                    )}

                    <TextInput
                      label="Password"
                      mode="outlined"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      style={styles.input}
                      autoCapitalize="none"
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

                    <Button
                      mode="contained"
                      loading={loading}
                      onPress={handleSubmit}
                      style={styles.button}
                      labelStyle={styles.buttonLabel}
                      buttonColor={primaryColor}>
                      {!loading && 'Register'}
                    </Button>

                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        Already have an account?{' '}
                        <Text
                          style={styles.linkText}
                          onPress={() => navigate('Login')}>
                          Login
                        </Text>
                      </Text>
                    </View>
                  </>
                )}
              </Formik>
            </SubContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Register;

const styles = {
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
  textContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  linkText: {
    color: primaryColor,
    fontWeight: 'bold',
  },
};

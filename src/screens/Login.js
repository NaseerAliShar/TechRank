import axios from 'axios';
import {Formik} from 'formik';
import {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TouchableOpacity, ScrollView, Image, Text, View} from 'react-native';

const Login = ({navigation}) => {
  const [eye, setEye] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = values => {
    setLoading(true);
    axios
      .post(
        'https://p3x08xsn-3000.inc1.devtunnels.ms/api/v1/auth/login',
        values,
      )
      .then(res => {
        AsyncStorage.setItem('token', res.data.token).then(() => {
          navigation.replace('Home');
          console.log(res.data.token);
        });
      })
      .catch(err => {
        console.error(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/techrank1.png')}
        style={{height: 250, width: 300}}
        resizeMode="contain"
      />
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={values => handleLogin(values)}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <TextInput
                mode="flat"
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                style={{backgroundColor: '#fff', marginBottom: 20}}
                activeUnderlineColor="#379237"
                underlineColor="transparent"
                placeholderTextColor="#000"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                mode="flat"
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                style={{backgroundColor: '#fff', marginBottom: 20}}
                activeUnderlineColor="#379237"
                underlineColor="transparent"
                placeholderTextColor="#000"
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
                buttonColor="#4B56D2"
                textColor="#fff">
                {loading ? 'Signing...' : 'Sign In'}
              </Button>
            </>
          )}
        </Formik>

        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginVertical: 30,
          }}>
          <Text style={{fontSize: 15, color: 'gray'}}>or sign in with</Text>
        </View>

        <View
          style={{flexDirection: 'row', justifyContent: 'center', padding: 20}}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/google.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../assets/facebook.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={require('../../assets/linkedin.png')}
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
    padding: 25,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
    resizeMode: 'contain',
  },
};

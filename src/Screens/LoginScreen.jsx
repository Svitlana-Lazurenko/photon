import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  StyleSheet,
} from 'react-native';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const [state, setState] = useState(initialState);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [hidingPassword, setHidingPassword] = useState(true);

  const validateEmail = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  const onLogin = () => {
    const email = state.email;
    const password = state.password;

    if (!email.trim() || !password.trim()) {
      Alert.alert('Усі поля повинні бути заповнені !');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(`${email} - некоректна адреса електронної пошти !`);
      return;
    }

    console.log(state);
    setState(initialState);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={require('../images/background.jpg')}>
          <ScrollView>
            {/*----------- FORM------------- */}
            <View style={styles.form}>
              {/* ------------TITLE--------------- */}
              <Text style={styles.title}>Увійти</Text>
              {/* ----------INPUTS---------------- */}
              <TextInput
                style={{
                  ...styles.input,
                  marginHorizontal: 15,
                  marginBottom: 15,
                  borderColor: focusEmail ? '#FF6C00' : '#E8E8E8',
                }}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                value={state.email}
                placeholder="Адреса електронної пошти"
                cursorColor={'#BDBDBD'}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={email => setState({ ...state, email })}
              ></TextInput>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: focusPassword ? '#FF6C00' : '#E8E8E8',
                  }}
                  onFocus={() => setFocusPassword(true)}
                  onBlur={() => setFocusPassword(false)}
                  value={state.password}
                  placeholder="Пароль"
                  cursorColor={'#BDBDBD'}
                  placeholderTextColor={'#BDBDBD'}
                  secureTextEntry={hidingPassword}
                  onChangeText={password => setState({ ...state, password })}
                ></TextInput>
                <TouchableOpacity
                  style={styles.inputButton}
                  onPress={() => setHidingPassword(prevState => !prevState)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.inputButtonText}>
                    {hidingPassword ? 'Показати' : 'Приховати'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* ----------------BUTTONS---------------- */}
              <TouchableOpacity style={styles.formButton} onPress={onLogin} activeOpacity={0.7}>
                <Text style={styles.formButtonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.text}>
                  <Text>Немає акаунту? </Text>
                  <Text style={styles.textLink}>Зареєструватися</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  form: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: '65%',
    paddingBottom: 300,
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 35,
    color: '#212121',
    fontWeight: '500',
    marginTop: 40,
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E8E8E8',
    borderRadius: 10,
    backgroundColor: '#F6F6F6',
    height: 50,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontWeight: '400',
  },

  inputWrapper: {
    marginHorizontal: 15,
    marginBottom: 40,
    position: 'relative',
  },

  inputButton: {
    position: 'absolute',
    top: '30%',
    right: 25,
  },

  inputButtonText: {
    color: '#1B4371',
    fontSize: 16,
    lineHeight: 19,
    fontWeight: '400',
  },

  formButton: {
    height: 50,
    marginBottom: 20,
    marginHorizontal: 15,
    backgroundColor: '#FF6C00',
    borderRadius: 100,
    justifyContent: 'center',
  },

  formButtonText: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
  },

  text: {
    color: '#1B4371',
    textAlign: 'center',
  },

  textLink: {
    textDecorationLine: 'underline',
  },
});

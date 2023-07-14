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
import PlusIcon from 'react-native-vector-icons/AntDesign';
// import CloseIcon from "react-native-vector-icons/AntDesign";

const initialState = {
  email: '',
  password: '',
  login: '',
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [focusLogin, setFocusLogin] = useState(false);
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
    const login = state.login;

    if (!email.trim() || !password.trim() || !login.trim()) {
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
              {/* -----------------AVATAR----------------- */}
              <View style={styles.avatar}>
                <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
                  <PlusIcon name="plus" size={20} color="#FF6C00" />
                </TouchableOpacity>
              </View>

              {/* ------------TITLE--------------- */}
              <Text style={styles.title}>Реєстрація</Text>
              {/* ----------INPUTS---------------- */}
              <TextInput
                style={{
                  ...styles.input,
                  marginHorizontal: 15,
                  marginBottom: 15,
                  borderColor: focusLogin ? '#FF6C00' : '#E8E8E8',
                }}
                onFocus={() => setFocusLogin(true)}
                onBlur={() => setFocusLogin(false)}
                value={state.login}
                placeholder="Логін"
                cursorColor={'#BDBDBD'}
                placeholderTextColor={'#BDBDBD'}
                onChangeText={login => setState({ ...state, login })}
              ></TextInput>
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

export default RegistrationScreen;

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

  avatar: {
    position: 'absolute',
    top: '-15%',
    right: '35%',
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
  },

  avatarButton: {
    position: 'absolute',
    top: '60%',
    right: '-10%',
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF6C00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 35,
    color: '#212121',
    fontWeight: '500',
    marginTop: 70,
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

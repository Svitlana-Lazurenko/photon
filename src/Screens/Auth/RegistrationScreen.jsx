import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { authSignUpUser } from '../../../redux/auth/authOperations';

const initialState = {
  email: '',
  password: '',
  login: '',
  avatar: null,
};

const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [focusLogin, setFocusLogin] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [hidingPassword, setHidingPassword] = useState(true);
  const [hidingKeyboard, setHidingKeyboard] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSetAvatar = () => {
    //  Calls the media-library and sets the avatar in state
  };

  const validateEmail = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  const onRegistration = () => {
    const email = state.email;
    const password = state.password;
    const login = state.login;
    const avatar = state.avatar;

    if (
      !email.trim() ||
      !password.trim() ||
      !login.trim()
      // || !avatar
    ) {
      Alert.alert('Всі поля та фото профілю повинні бути заповнені !');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(`${email} - некоректна адреса електронної пошти !`);
      return;
    }

    console.log(state);
    dispatch(authSignUpUser(state));
    setState(initialState);
    Keyboard.dismiss();
    setHidingKeyboard(true);
  };

  const onHideKeyboard = () => {
    Keyboard.dismiss();
    setHidingKeyboard(true);
  };

  return (
    <TouchableWithoutFeedback onPress={onHideKeyboard}>
      <View style={styles.container}>
        <ImageBackground style={styles.background} source={require('../../images/background.jpg')}>
          <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={-300}>
            {/*----------- FORM------------- */}
            <View style={{ ...styles.form, paddingBottom: hidingKeyboard ? 100 : 10 }}>
              {/* -----------------AVATAR----------------- */}
              <View style={styles.avatarWrapper}>
                <Image source={state.avatar} style={styles.avatar} />
                <TouchableOpacity
                  style={{
                    ...styles.avatarButton,
                    borderColor: state.avatar ? '#BDBDBD' : '#FF6C00',
                  }}
                  onPress={onSetAvatar}
                >
                  {state.avatar ? (
                    <IconIonicons name="close-outline" size={20} color="#BDBDBD" />
                  ) : (
                    <IconIonicons name="add" size={20} color="#FF6C00" />
                  )}
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
                onFocus={() => {
                  setFocusLogin(true);
                  setHidingKeyboard(false);
                }}
                onBlur={() => {
                  setFocusLogin(false);
                  setHidingKeyboard(true);
                }}
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
                onFocus={() => {
                  setFocusEmail(true);
                  setHidingKeyboard(false);
                }}
                onBlur={() => {
                  setFocusEmail(false);
                  setHidingKeyboard(true);
                }}
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
                  onFocus={() => {
                    setFocusPassword(true);
                    setHidingKeyboard(false);
                  }}
                  onBlur={() => {
                    setFocusPassword(false);
                    setHidingKeyboard(true);
                  }}
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
                >
                  <Text style={styles.inputButtonText}>
                    {hidingPassword ? 'Показати' : 'Приховати'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* ----------------BUTTONS---------------- */}
              <TouchableOpacity
                style={styles.formButton}
                onPress={onRegistration}
                activeOpacity={0.7}
              >
                <Text style={styles.formButtonText}>Увійти</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.text}>
                  <Text>Вже є акаунт? </Text>
                  <Text style={styles.textLink} onPress={() => navigation.navigate('Login')}>
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  form: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatarWrapper: {
    position: 'absolute',
    top: '-50%',
    right: '35%',
    width: 120,
    height: 120,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
  },

  avatarButton: {
    position: 'absolute',
    top: '65%',
    right: '-10%',
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
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

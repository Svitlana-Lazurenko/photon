import React from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './components/Main';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

// import React, { useState } from 'react';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

import LoginScreen from './src/Screens/Auth/LoginScreen';
import RegistrationScreen from './src/Screens/Auth/RegistrationScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';

// const AuthStack = createStackNavigator();
// const HomeStack = createStackNavigator();

const Stack = createStackNavigator();

// const useRoute = isAuth => {
//   if (!isAuth) {
//     return (
//       <AuthStack.Navigator>
//         <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
//         <AuthStack.Screen
//           name="Registration"
//           component={RegistrationScreen}
//           options={{
//             headerShown: false,
//           }}
//         />
//       </AuthStack.Navigator>
//     );
//   }

//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./src/fonts/Roboto-Bold.ttf'),
    'Roboto-Medium': require('./src/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./src/fonts/Roboto-Regular.ttf'),
  });
  if (!fontsLoaded) {
    return null;
  }

  // const routing = useRoute(null); // A null or object comes from the backend

  return (
    <NavigationContainer>
      {/* {routing} */}
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/Screens/Auth/LoginScreen';
import RegistrationScreen from './src/Screens/Auth/RegistrationScreen';
import HomeScreen from './src/Screens/Home/HomeScreen';

const AuthStack = createStackNavigator();
const HomeStack = createStackNavigator();

const useRoute = isAuth => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default useRoute;

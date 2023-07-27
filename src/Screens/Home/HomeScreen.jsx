import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          if (route.name === 'Posts') {
            return (
              <View
                backgroundColor={focused ? '#FF6C00' : 'transparent'}
                width={70}
                height={40}
                borderRadius={50}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <IconIonicons
                  name={'md-grid-outline'}
                  size={size}
                  color={focused ? '#FFFFFF' : '#212121'}
                />
              </View>
            );
          }

          if (route.name === 'CreatePosts') {
            return <IconIonicons name={'add'} size={35} color={'#212121'} />;
          }

          if (route.name === 'Profile') {
            return (
              <View
                backgroundColor={focused ? '#FF6C00' : 'transparent'}
                width={70}
                height={40}
                borderRadius={50}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <IconIonicons
                  name={'person-outline'}
                  size={size}
                  color={focused ? '#FFFFFF' : '#212121'}
                />
              </View>
            );
          }
        },
        headerTitleAlign: 'center',
        tabBarShowLabel: false,
        tabBarStyle:
          route.name === 'CreatePosts'
            ? { display: 'none' }
            : { height: 83, paddingHorizontal: 50 },
        headerLeftContainerStyle: route.name === 'CreatePosts' ? { paddingLeft: 15 } : {},
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          title: 'Створити публікацію',
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
              <IconIonicons name={'arrow-back-outline'} size={30} color={'#212121'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default HomeScreen;

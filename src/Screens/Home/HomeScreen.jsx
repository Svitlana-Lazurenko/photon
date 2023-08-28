import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import PostsScreen from './PostsScreen';
import CreatePostsScreen from './CreatePostsScreen';
import ProfileScreen from './ProfileScreen';
import CommentsScreen from './CommentsScreen';
import MapScreen from './MapScreen';
import { authSignOutUser } from '../../../redux/auth/authOperations';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

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
        tabBarShowLabel: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontWeight: 500,
          fontSize: 17,
          lineHeight: 22,
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarStyle: { height: 83, paddingHorizontal: 50 },
          title: 'Публікації',
          headerRightContainerStyle: { paddingRight: 15 },
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <IconIonicons name={'ios-exit-outline'} size={30} color={'#BDBDBD'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: 'none' },
          title: 'Створити публікацію',
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Posts')}>
              <IconIonicons name={'arrow-back-outline'} size={30} color={'#212121'} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarStyle: { height: 83, paddingHorizontal: 50 }, headerShown: false }}
      />
      <Tab.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconIonicons name={'arrow-back-outline'} size={30} color={'#212121'} />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Мапа',
          headerLeftContainerStyle: { paddingLeft: 15 },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconIonicons name={'arrow-back-outline'} size={30} color={'#212121'} />
            </TouchableOpacity>
          ),
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;

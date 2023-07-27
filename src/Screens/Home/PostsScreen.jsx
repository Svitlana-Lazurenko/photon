import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import IconIonicons from 'react-native-vector-icons/Ionicons';

import DefaultScreen from '../PostScreenNested/DefaultScreen';
import CommentsScreen from '../PostScreenNested/CommentsScreen';
import MapScreen from '../PostScreenNested/MapScreen';

const PostsScreenStack = createStackNavigator();

const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <PostsScreenStack.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerRightContainerStyle: route.name === 'Default' ? { paddingRight: 15 } : {},
      })}
    >
      <PostsScreenStack.Screen
        name="Default"
        component={DefaultScreen}
        options={{
          title: 'Публікації',
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <IconIonicons name={'ios-exit-outline'} size={30} color={'#BDBDBD'} />
            </TouchableOpacity>
          ),
          headerLeft: () => <></>,
        }}
      />
      <PostsScreenStack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: 'Коментарі',
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />
      <PostsScreenStack.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: 'Мапа',
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
        }}
      />
    </PostsScreenStack.Navigator>
  );
};

export default PostsScreen;

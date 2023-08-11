import React from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { authSignOutUser } from '../../../redux/auth/authOperations';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text>sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    alignItems: 'center',
    marginTop: 200,
  },
});

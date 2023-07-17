import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>{/* <Text style={styles.title}>ProfileScreen</Text> */}</View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
  },
});

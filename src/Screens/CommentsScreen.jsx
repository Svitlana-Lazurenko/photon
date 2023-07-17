import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CommentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CommentsScreen</Text>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
  },
});

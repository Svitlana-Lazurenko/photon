import React from 'react';
import { View, StyleSheet } from 'react-native';

const PostsScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>CreatePostsScreen</Text> */}
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    textAlign: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  // SafeAreaView,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import { db } from '../../../firebase/config';

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { photo } = route.params.item;
  const { login } = useSelector(state => state.auth);

  const isFocused = useIsFocused();

  const createComment = async () => {
    const postsRef = collection(db, 'posts');
    const data = { comment, login, timestamp: serverTimestamp() };
    await addDoc(collection(postsRef, photo, 'comments'), data);
    // setComment('');
  };

  const getAllComments = async () => {
    const postsRef = collection(db, 'posts/' + photo + '/collections');
    const q = query(postsRef);
    const commentsArr = [];
    onSnapshot(q, querySnapshot => {
      querySnapshot.forEach(doc => {
        commentsArr.push(doc.data());
      });
    });
    setAllComments(commentsArr);
  };

  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.image} source={route.params.photo} />
        {/* <SafeAreaView style={styles.innerContainer}> */}
        {isFocused ? (
          <FlatList
            style={styles.list}
            data={allComments}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.commentContainer}>
                  <Text style={styles.comment}>{item.login}</Text>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <Text style={styles.comment}>{item.timestamp}</Text>
                </View>
              );
            }}
          ></FlatList>
        ) : null}
        {/* </SafeAreaView> */}
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            cursorColor={'#BDBDBD'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={comment => setComment(comment)}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={createComment} activeOpacity={0.7}>
            <IconIonicons name="arrow-up" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },

  image: {
    height: 250,
    width: 350,
    backgroundColor: '#000000',
    borderRadius: 8,
  },

  innerContainer: {
    height: 370,
  },

  list: {},

  commentContainer: {},

  comment: {},

  inputWrapper: {
    position: 'relative',
  },

  input: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#E8E8E8',
    backgroundColor: '#F6F6F6',
    paddingLeft: 16,
  },

  button: {
    position: 'absolute',
    top: 6,
    right: 8,
    padding: 8,
    backgroundColor: '#FF6C00',
    borderRadius: 50,
  },
});

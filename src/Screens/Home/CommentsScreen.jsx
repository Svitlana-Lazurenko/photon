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
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { collection, addDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const { photo } = route.params.item;
  const { login } = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  const createDate = () => {
    const date = new Date();
    const dateString = date.toString();
    const dateArr = dateString.split(' ');
    const shortDate = dateArr.slice(1, 5);
    return shortDate.join(' ');
  };

  const createComment = async () => {
    const postsRef = collection(db, 'posts');
    const data = {
      comment,
      login,
      timestamp: createDate(),
    };

    await addDoc(collection(postsRef, photo, 'comments'), data);
    setComment('');
    Keyboard.dismiss();
  };

  const getAllComments = async () => {
    const commentsRef = collection(db, 'posts/' + photo + '/comments');
    const q = query(commentsRef);
    onSnapshot(q, querySnapshot => {
      setAllComments(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
        }))
      );
    });
  };

  useEffect(() => {
    if (isFocused) {
      getAllComments();
    }
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.image} source={route.params.photo} />

        <FlatList
          style={styles.list}
          data={allComments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.commentContainer}>
                <Text style={styles.commentLogin}>{item.login}</Text>
                <Text style={styles.comment}>{item.comment}</Text>
                <Text style={styles.commentDate}>{item.timestamp}</Text>
              </View>
            );
          }}
        ></FlatList>

        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          style={styles.inputWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            value={comment}
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
    marginBottom: 15,
  },

  list: {},

  commentContainer: {
    backgroundColor: '#F6F6F6',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    width: 340,
  },

  commentLogin: {
    fontSize: 16,
    fontWeight: 600,
  },

  comment: {
    color: '#212121',
    fontSize: 13,
    lineHeight: 18,
  },

  commentDate: {
    color: '#BDBDBD',
    fontSize: 10,
    textAlign: 'right',
  },

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

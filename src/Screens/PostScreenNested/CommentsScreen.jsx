import React from 'react';
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
import IconIonicons from 'react-native-vector-icons/Ionicons';

const CommentsScreen = ({ route }) => {
  const sendComment = () => {
    // send comment
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.image} source={route.params.photo} />
        <FlatList
          data={route.params.comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                <Text>{item}</Text>
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
            cursorColor={'#BDBDBD'}
            placeholderTextColor={'#BDBDBD'}
          ></TextInput>
          <TouchableOpacity style={styles.button} onPress={sendComment} activeOpacity={0.7}>
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
    backgroundColor: '#212121',
    borderRadius: 8,
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

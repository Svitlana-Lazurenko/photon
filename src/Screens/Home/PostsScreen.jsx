import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';

const PostsScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const { login } = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  const getAllPost = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef);
    onSnapshot(q, querySnapshot => {
      setPosts(
        querySnapshot.docs.map(doc => ({
          ...doc.data(),
          // commentsNumber: ,
        }))
      );
    });
  };

  useEffect(() => {
    if (isFocused) {
      getAllPost();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.imageAvatar}
          // source={''}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{login}</Text>
          {/* <Text style={styles.email}>{email}</Text> */}
        </View>
      </View>
      <SafeAreaView style={styles.innerContainer}>
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const photo = item.photo;
            const location = item.geoLocation;
            // const number = item.commentsNumber;
            return (
              <View style={styles.photoContainer}>
                <Image style={styles.image} source={Number(photo)} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.commentsButton}
                    onPress={() => navigation.navigate('Comments', { item })}
                  >
                    <IconIonicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                    {/* <Text style={styles.commentsButtonText}>{number}</Text> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => navigation.navigate('Map', location)}
                  >
                    <IconIonicons name="location-outline" size={24} color="#BDBDBD" />
                    <Text style={styles.mapButtonText}>{item.place}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </SafeAreaView>
    </View>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  userContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    paddingVertical: 32,
  },

  imageAvatar: {
    height: 60,
    width: 60,
    backgroundColor: '#F6F6F6',
    borderRadius: 16,
  },

  textWrapper: {
    marginLeft: 8,
  },

  name: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: 15,
    letterSpacing: 0,
  },

  email: {
    fontSize: 11,
    fontWeight: 400,
    lineHeight: 13,
    letterSpacing: 0,
  },

  innerContainer: {
    alignItems: 'center',
  },

  list: {
    marginBottom: 110,
  },

  photoContainer: {
    marginBottom: 32,
  },

  image: {
    height: 250,
    width: 350,
    backgroundColor: '#000000',
    borderRadius: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0,
    color: '#212121',
    marginVertical: 8,
  },

  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  commentsButton: {
    display: 'flex',
    flexDirection: 'row',
  },

  commentsButtonText: {
    fontSize: 16,
    fontWeight: 400,
    color: '#BDBDBD',
    marginLeft: 6,
  },

  mapButton: {
    display: 'flex',
    flexDirection: 'row',
  },

  mapButtonText: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0,
    textDecorationLine: 'underline',
    color: '#212121',
    marginLeft: 4,
  },
});

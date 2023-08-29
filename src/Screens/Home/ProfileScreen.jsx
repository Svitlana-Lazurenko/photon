import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { onSnapshot, query, where, collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { authSignOutUser } from '../../../redux/auth/authOperations';

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userId, login } = useSelector(state => state.auth);
  const isFocused = useIsFocused();

  const onSetAvatar = () => {
    //  Calls the media-library and sets the avatar in state
  };

  const getAllUserPost = async () => {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('userId', '==', userId));
      onSnapshot(q, querySnapshot => {
        setUserPosts(
          querySnapshot.docs.map(doc => ({
            ...doc.data(),
          }))
        );
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    if (isFocused) {
      getAllUserPost();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../images/background.jpg')}
      >
        <View style={styles.background}>
          <View style={styles.avatarWrapper}>
            <Image source={avatar} style={styles.avatar} />
            <TouchableOpacity
              style={{
                ...styles.avatarButton,
                borderColor: avatar ? '#BDBDBD' : '#FF6C00',
              }}
              onPress={onSetAvatar}
            >
              {avatar ? (
                <IconIonicons name="close-outline" size={20} color="#BDBDBD" />
              ) : (
                <IconIonicons name="add" size={20} color="#FF6C00" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
            <IconIonicons name={'ios-exit-outline'} size={30} color={'#BDBDBD'} />
          </TouchableOpacity>
          <Text style={styles.login}>{login}</Text>
          <View style={styles.innerContainer}>
            <FlatList
              style={styles.list}
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                const coords = item.coords;
                return (
                  <View style={styles.photoContainer}>
                    <Image style={styles.image} source={Number(item.postId)} />
                    <Text style={styles.title}>{item.title}</Text>
                    <View style={styles.buttonsContainer}>
                      <TouchableOpacity
                        style={styles.commentsButton}
                        onPress={() => navigation.navigate('Comments', { item })}
                      >
                        <IconIonicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                        {/* <Text style={styles.commentsButtonText}>item.comments.length</Text> */}
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.mapButton}
                        onPress={() => navigation.navigate('Map', coords)}
                      >
                        <IconIonicons name="location-outline" size={24} color="#BDBDBD" />
                        <Text style={styles.mapButtonText}>{item.place}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            ></FlatList>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  background: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  avatarWrapper: {
    position: 'absolute',
    top: '-10%',
    right: '35%',
    width: 120,
    height: 120,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#F6F6F6',
  },

  avatarButton: {
    position: 'absolute',
    top: '65%',
    right: '-10%',
    width: 25,
    height: 25,
    borderRadius: 50,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  login: {
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 35,
    color: '#212121',
    fontWeight: '500',
    marginTop: 70,
    marginBottom: 30,
  },

  signOutButton: {
    position: 'absolute',
    top: '-31%',
    right: '5%',
    alignItems: 'center',
    marginTop: 200,
  },

  innerContainer: {
    height: 450,
    alignItems: 'center',
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

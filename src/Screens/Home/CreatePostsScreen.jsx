import React, { useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase/config';

const CreatePostsScreen = () => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [locality, setLocality] = useState('');
  const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
  const [hasPermissionGeolocation, setHasPermissionGeolocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const permissionCamera = await Camera.requestCameraPermissionsAsync();
      setHasPermissionCamera(permissionCamera.status === 'granted');
      const permissionLocation = await Location.requestForegroundPermissionsAsync();
      setHasPermissionGeolocation(permissionLocation.status === 'granted');
    })();
  }, []);

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
    );
  };

  const cleanData = () => {
    setImage(null);
    setTitle('');
    setLocality('');
  };

  const cleanPhoto = () => {
    setImage(null);
  };

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();
      setImage(photo.uri);
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const uploadPhotoToserver = async () => {
    const response = await fetch(image);
    const file = await response.blob();
    const postId = Date.now().toString();
    const imagesRef = ref(storage, `images/${postId}`);
    await uploadBytes(imagesRef, file).then(snapshot => {
      console.log('Uploaded a blob !');
    });

    await getDownloadURL(imagesRef)
      .then(url => {
        console.log(url);
        // Or inserted into an <img> element
        // const img = document.getElementById('myimg');
        // img.setAttribute('src', url);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const sendPhoto = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      uploadPhotoToserver();
      navigation.navigate('Posts', { image, title, locality, comments: [], geoLocation: coords });
      cleanData();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  if (hasPermissionCamera === null || hasPermissionGeolocation === null) {
    return <View />;
  }
  if (hasPermissionCamera === false || hasPermissionGeolocation === false) {
    return <Text>Немає доступу до камери або геолокації</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} type={type} ref={setCameraRef}>
            <TouchableOpacity style={styles.flipButton} onPress={flipCamera}>
              <IconMaterialIcons name="flip-camera-android" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.snapButton} onPress={takePhoto}>
              <IconIonicons name="camera" size={25} color="#BDBDBD" />
            </TouchableOpacity>
          </Camera>
          {image && (
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: image }} />
            </View>
          )}
        </View>
        <View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>{image ? 'Редагувати фото' : 'Завантажте фото'}</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            value={title}
            placeholder="Назва..."
            cursorColor={'#BDBDBD'}
            placeholderTextColor={'#BDBDBD'}
            onChangeText={title => setTitle(title)}
          ></TextInput>
          <View style={styles.iputWrapper}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 35 }}
              value={locality}
              placeholder="Місцевість..."
              cursorColor={'#BDBDBD'}
              placeholderTextColor={'#BDBDBD'}
              onChangeText={locality => setLocality(locality)}
            ></TextInput>
            <IconIonicons
              name="location-outline"
              size={20}
              color="#BDBDBD"
              style={styles.inputIcon}
            />
          </View>
          <TouchableOpacity
            style={{ ...styles.sendButton, backgroundColor: image ? '#FF6C00' : '#F6F6F6' }}
            onPress={image ? sendPhoto : null}
            activeOpacity={0.7}
          >
            <Text style={{ ...styles.sendText, color: image ? '#FFFFFF' : '#BDBDBD' }}>
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={cleanPhoto} activeOpacity={0.7}>
          <IconIonicons name="trash-outline" size={25} color="#DADADA" />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 32,
  },

  cameraContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  camera: {
    height: 250,
    width: 350,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  flipButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  snapButton: {
    borderRadius: 50,
    height: 50,
    width: 50,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
  },

  image: {
    height: 250,
    width: 350,
  },

  editButton: {
    marginTop: 8,
    marginBottom: 32,
    width: 131,
  },

  editText: {
    fontSize: 16,
    fontWeight: 400,
    letterSpacing: 0,
    color: '#BDBDBD',
  },

  iputWrapper: {
    position: 'relative',
    marginTop: 16,
    marginBottom: 32,
  },

  inputIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    backgroundColor: 'transparent',
    height: 45,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontWeight: '400',
  },

  sendButton: {
    height: 50,
    width: 350,
    borderRadius: 100,
    justifyContent: 'center',
  },

  sendText: {
    textAlign: 'center',
  },

  deleteButton: {
    backgroundColor: '#F6F6F6',
    width: 70,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 120,
  },
});

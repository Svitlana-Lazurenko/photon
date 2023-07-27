import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';

const DefaultScreen = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params !== undefined) {
      setPosts(prevState => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image
          style={styles.imageAvatar}
          // source={''}
        />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.innerContainer}>
        <FlatList
          style={styles.list}
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const photo = item.photo;
            const location = item.geoLocation;
            const comments = item.comments;
            const numberComments = comments.length;
            return (
              <View style={styles.photoContainer}>
                <Image style={styles.image} source={photo} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    style={styles.commentsButton}
                    onPress={() => navigation.navigate('Comments', { photo, comments })}
                  >
                    <IconIonicons name="chatbubble-outline" size={24} color="#BDBDBD" />
                    <Text style={styles.commentsButtonText}>{numberComments}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.mapButton}
                    onPress={() => navigation.navigate('Map', location)}
                  >
                    <IconIonicons name="location-outline" size={24} color="#BDBDBD" />
                    <Text style={styles.mapButtonText}>{item.locality}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default DefaultScreen;

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
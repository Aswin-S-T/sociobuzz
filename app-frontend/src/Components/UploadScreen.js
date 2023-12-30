// UploadScreen.js

import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../config';

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1
    });
    const source = { uri: result.assets[0].uri };
    console.log(source);
    setImage(source);
  };

  const uploadImage = async () => {
    setUploading(true);

    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);

    console.log('file name: ', filename);
    console.log('BLOB---------', blob);
    console.log('storage222222222222', storage)
    var ref = storage.ref(`/images/${filename}`)//.child(filename);  // Use ref method directly

    try {
      await ref.put(blob);
    } catch (e) {
      console.log('Error ============', e);
    }

    setUploading(false);
    Alert.alert('Photo uploaded!');
    setImage(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
        <Text style={styles.btnText}>Pick an Image</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image.uri }} style={{ width: 300, height: 300 }} />}
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
          <Text style={styles.btnText}>Upload Image</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  selectButton: {
    backgroundColor: "red",
    width: 100,
    height: 40
  },
  btnText: {
    color: 'blue'
  },
  imageContainer: {
    padding: 10
  },
  uploadButton: {
    backgroundColor: "red",
    width: 100,
    height: 40
  }
});

export default UploadScreen;

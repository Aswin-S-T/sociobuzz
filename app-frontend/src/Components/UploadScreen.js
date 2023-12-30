import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator,ProgressBarAndroid} from 'react-native';
import * as ImagePicker from "expo-image-picker"
import { firebase } from '../Config/firebase';
import { v4 as uuidv4 } from 'uuid'; 
import { getRandomBytes } from 'expo-random';


const UploadScreen = () => {
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [loading,setLoading] = useState(false)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true)
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function() {
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });
      const randomBytes = await getRandomBytes(16); // 16 bytes for UUID
    const imageName = `Pictures/Image_${uuidv4({ random: [...randomBytes] })}`;

      const ref = firebase.storage().ref().child(imageName);
      const snapshot = await ref.put(blob);
  
      // Get download URL after the upload is complete
      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log("Download URL: ", downloadURL);
      setLoading(false)
  
      // Update state or perform other actions with the download URL
      setImage(downloadURL);
  
      // Clean up resources
      blob.close();
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };
  

  return (
    <View>
       <View style={styles.container}>
      {image && <Image source={{uri: image}} style={{width: 170 , height: 200}}/>}
      <Button title='Select Image' onPress={pickImage} />
      {!uploading ? <Button title='Upload Image' onPress={uploadImage} />: <ActivityIndicator size={'small'} color='black' />}
      {loading && (
        <>
           <ProgressBarAndroid styleAttr="Horizontal" />
        </>
      )}
    </View>
  
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default UploadScreen
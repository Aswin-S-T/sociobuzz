import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  ProgressBarAndroid,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomBytes } from "expo-random";
import Icon from "react-native-vector-icons/FontAwesome";

const UploadScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(route?.params?.id);
  const [caption, setCaption] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    setUploading(false);
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    try {
      setLoading(true);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      const randomBytes = await getRandomBytes(16);
      const imageName = `Pictures/Image_${uuidv4({
        random: [...randomBytes],
      })}`;

      const ref = firebase.storage().ref().child(imageName);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log("Download URL: ", downloadURL);

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";
      //const apiUrl = 'http://192.168.214.245:5000/api/v1/user/add-post'
      const userId = route?.id;
      const imageType = "jpg";
      const about = "About your post";

      const postData = {
        userId: uid,
        caption,
        image: downloadURL,
        imageType,
        about,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();

      if (responseData.status === 200) {
        console.log("Post uploaded successfully!");
      } else {
        console.error("Error uploading post:", responseData);
      }
      setLoading(false);

      setImage(downloadURL);

      blob.close();
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <View style={{ top: 50, position: "relative" }}>
      <TouchableOpacity
        onPress={pickImage}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="camera" size={40} color="grey" />
        <Text>Select Image</Text>
      </TouchableOpacity>
      <View style={{ margin: 20 }}>
        {image && (
          <Image source={{ uri: image }} style={{ width: 170, height: 200 }} />
        )}
        <TextInput
          style={{
            top: 20,
            position: "relative",
            backgroundColor: "transparent",
            borderStyle: "solid",
            borderColor: "grey",
            borderWidth: 1,
            padding: 10,
            height: 200,
            width: "100%",
            outline: "none",
            borderRadius: 5,
          }}
          placeholder="Add caption...."
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
        {!uploading ? (
          <Button
            style={{ top: 20, position: "relative" }}
            title="Upload Image"
            onPress={uploadImage}
          />
        ) : (
          <ActivityIndicator size={"small"} color="black" />
        )}
        {loading && (
          <>
            <ProgressBarAndroid styleAttr="Horizontal" />
          </>
        )}
      </View>
      <View style={styles.container}>
        {/* <Button title='Select Image' onPress={pickImage} /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
});
export default UploadScreen;

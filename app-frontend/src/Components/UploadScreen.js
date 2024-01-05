import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
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
  ScrollView,
  ToastAndroid,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomBytes } from "expo-random";
import Icon from "react-native-vector-icons/FontAwesome";
import { Video, ResizeMode } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import * as ExpoCrypto from "expo-crypto";

const UploadScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(route?.params?.id);
  const [caption, setCaption] = useState(null);
  const [video, setVideo] = useState(null);
  const [vUri, setvUri] = useState("");
  const [status, setStatus] = useState({});

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

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

  const pickVedio = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "video/*",
    });

    if (!result.canceled) {
      setVideo(result);

      setvUri(result?.assets[0]?.uri);
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
      console.log("RANDOM BYTES---------", randomBytes);
      const imageName = `Pictures/Image_${uuidv4({
        random: [...randomBytes],
      })}`;

      const ref = firebase.storage().ref().child(imageName);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log("Download URL: ", downloadURL);

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";
      console.log("API URL==========", apiUrl);
      //const apiUrl = 'http://192.168.214.245:5000/api/v1/user/add-post'
      console.log("Route----------", route ? route : "no route");
      const userId = route?.id;
      console.log("USER I------------", userId);
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

  const uploadVideo = async () => {
    console.log("BUTTON CLIEKC FOR VEDIO");
    try {
      // setLoading(true);

      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", vUri, true);
        xhr.send(null);
      });

      console.log("BLOB----------", blob);

      const randomBytes = await ExpoCrypto.getRandomBytes(16); // await getRandomBytes(16);
      const videoName = `Videos/Video_${uuidv4({
        random: [...randomBytes],
      })}`;

      const ref = firebase.storage().ref().child(videoName);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();
      console.log("Download URL: ", downloadURL);

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";
      // const apiUrl = 'http://192.168.214.245:5000/api/v1/user/add-post'
      const userId = route?.id;
      const videoType = "mp4"; // Change this to the actual video type
      const about = "About your post";

      const postData = {
        userId: uid,
        caption,
        image: downloadURL,
        imageType: "Video",
        about,
      };
      console.log("POST DATA----------", postData);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();

      if (responseData.status === 200) {
        console.log("Video uploaded successfully!");
        ToastAndroid.showWithGravity(
          "Your post added",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      } else {
        console.error("Error uploading video:", responseData);
      }

      setLoading(false);
      // setVideo(downloadURL);
      blob.close();
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <ScrollView>
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
        <TouchableOpacity
          onPress={pickVedio}
          style={{ backgroundColor: "red", padding: 8 }}
        >
          <Text>Select vedio</Text>
        </TouchableOpacity>
        <View style={{ margin: 20 }}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 170, height: 200 }}
            />
          )}
          <View>
            {vUri ? (
              <>
                <Video
                  ref={video}
                  style={styles.video}
                  source={{
                    uri: vUri,
                  }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  isLooping
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
                <View style={styles.buttons}>
                  <Button
                    title={status.isPlaying ? "Pause" : "Play"}
                    onPress={() =>
                      status.isPlaying
                        ? video?.current?.pauseAsync()
                        : video?.current?.playAsync()
                    }
                  />
                </View>
              </>
            ) : (
              <></>
            )}
          </View>
          {/* {videoUri && (
          <>
            <Video
              source={{ uri: videoUri }}
              style={{ width: 200, height: 200 }}
              controls={true}
            />
            <TextInput
              style={{
                top: 20,
                position: "relative",
                background: "transparent",
                border: "none",
                padding: 10,
                outline: "none",
                borderRadius: 20,
                borderBottomWidth: 2,
                borderBottomColor: "#0E3D8B",
              }}
              placeholder="Add a caption"
            />
            <TouchableOpacity
              onPress={uploadImage}
              style={{
                borderRadius: 40,
                backgroundColor: "#0E3D8B",
                width: "50%",
                color: "#fff",
                padding: 10,
                border: "none",
                outline: "none",
                marginTop: 20,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>
          </>
        )} */}
          {console.log(
            "VEIDO URI IN JSX=============",
            vUri ? vUri : "no videoUri"
          )}
          {/* {videoUri ? (
          <Video
            source={{ uri: videoUri }}
            style={{ width: 200, height: 200 }}
            controls={true}
          />
        ) : (
          <></>
        )} */}
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

          <View style={styles.container}>
            <Button
              style={{ top: 30, position: "relative" }}
              title="Upload Video"
              onPress={uploadVideo}
            />
          </View>
          {/* <Button title='Select Image' onPress={pickImage} /> */}
        </View>
      </View>
    </ScrollView>
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
  video: {
    width: "100%",
    height: 400,
  },
});
export default UploadScreen;

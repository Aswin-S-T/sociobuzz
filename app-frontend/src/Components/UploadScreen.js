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
import { Entypo } from "@expo/vector-icons";

const UploadScreen = ({ route }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState(route?.params?.id);
  const [caption, setCaption] = useState(null);
  const [video, setVideo] = useState(null);
  const [vUri, setvUri] = useState("");
  const [status, setStatus] = useState({});
  const [postType, setPostType] = useState("");

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
    setPostType("image");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setUploading(false);
    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const pickVedio = async () => {
    setPostType("video");
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

      const imageName = `Pictures/Image_${uuidv4({
        random: [...randomBytes],
      })}`;

      const ref = firebase.storage().ref().child(imageName);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";

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
        ToastAndroid.showWithGravity(
          "Your post added",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
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
        xhr.open("GET", vUri, true);
        xhr.send(null);
      });

      const randomBytes = await ExpoCrypto.getRandomBytes(16); // await getRandomBytes(16);
      const videoName = `Videos/Video_${uuidv4({
        random: [...randomBytes],
      })}`;

      const ref = firebase.storage().ref().child(videoName);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";

      const userId = route?.id;
      const videoType = "mp4";
      const about = "About your post";

      const postData = {
        userId: uid,
        caption,
        image: downloadURL,
        imageType: "Video",
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
        ToastAndroid.showWithGravity(
          "Your post added",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        setPostType("image");
      } else {
        console.error("Error uploading video:", responseData);
      }

      setLoading(false);

      blob.close();
    } catch (error) {
      console.error("Upload error:", error);
      setUploading(false);
    }
  };

  return (
    <ScrollView>
      <View style={{ top: 50, position: "relative" }}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <Icon name="camera" size={40} color="grey" />
            <Text>Select Image</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={pickVedio}>
            <Entypo name="video" size={40} color="violet" />
            <Text>Select vedio</Text>
          </TouchableOpacity>
        </View>

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

          <TextInput
            style={{
              top: 20,
              position: "relative",
              borderStyle: "solid",
              borderColor: "grey",
              borderWidth: 1,
              padding: 10,
              height: 200,
              width: "100%",
              borderRadius: 5,
            }}
            placeholder="Add caption...."
            value={caption}
            onChangeText={(text) => setCaption(text)}
          />
          {postType == "image" && (
            <View>
              {!uploading ? (
                <Button
                  style={{ top: 20, position: "relative" }}
                  title="Upload Image"
                  onPress={uploadImage}
                />
              ) : (
                <ActivityIndicator size={"small"} color="black" />
              )}
            </View>
          )}
          {loading && (
            <>
              <ProgressBarAndroid styleAttr="Horizontal" />
            </>
          )}

          <View style={styles.container}>
            {postType == "video" && (
              <Button
                style={{ top: 30, position: "relative" }}
                title="Upload Video"
                onPress={uploadVideo}
              />
            )}
          </View>
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

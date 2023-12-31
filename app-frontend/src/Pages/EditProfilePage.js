import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomBytes } from "expo-random";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKEND_URL } from "../Constants/Api";

const EditProfilePage = ({ route }) => {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("This is your bio.");
  const [uid, setUid] = useState(route?.params?.userId);
  const [profileData, setProfileData] = useState("");
  const [image, setImage] = useState(
    "data:image/jpeg;base64,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"
  );
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileUpdating, setProfileUpdating] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let url = `https://sociobuzz.onrender.com/api/v1/user/details/${uid}`;

        const response = await fetch(url);
        const data = await response?.json();

        if (data && data?.data) {
          setUsername(data?.data?.username);
          setBio(data?.data?.about);
          setImage(data?.data?.profileImage);
          setProfileData(data?.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Post saved",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const pickImage = async () => {
    console.log("Profile image updated");
    setProfileUpdating(true);
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
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", result?.uri, true);
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
      let data = {
        userId: uid,
        profileImage: downloadURL,
      };
      const response = await fetch(
        `${BACKEND_URL}/api/v1/user/uploadProfile-image`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response && response.ok) {
        showToastWithGravity();
        setProfileUpdating(false);
      }
    }
  };

  const handleSaveChanges = async () => {
    let newData = {
      username,
      bio,
    };
    const response = await fetch(
      `${BACKEND_URL}/api/v1/user/edit-profile/${uid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    if (response.ok) {
      ToastAndroid.showWithGravity(
        "Profile updated",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          {/* <Image
            source={{
              uri: image,
            }}
            style={styles.cavatar}
          /> */}
          <TouchableOpacity
            onPress={pickImage}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Icon
              name="camera"
              size={20}
              color="grey"
              style={{ left: 50, top: -50, position: "relative" }}
            /> */}
            <Image
              source={{
                uri: image,
              }}
              style={styles.cavatar}
            />
          </TouchableOpacity>
          {profileUpdating ? (
            <>
              <ActivityIndicator size={"small"} color="black" />
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "grey",
                  fontFamily: "sans-serif",
                  fontSize: 12,
                }}
              >
                Click on the image to select new image
              </Text>
            </>
          )}
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            multiline
            value={bio}
            onChangeText={(text) => setBio(text)}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cavatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default EditProfilePage;

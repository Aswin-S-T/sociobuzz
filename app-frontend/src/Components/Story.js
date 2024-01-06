import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Button,
  ToastAndroid,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../Config/firebase";
import { v4 as uuidv4 } from "uuid";
import { getRandomBytes } from "expo-random";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BACKEND_URL } from "../Constants/Api";

const Story = () => {
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const formatTimeDifference = (time) => {
    const currentTime = new Date();
    const likedTime = new Date(time);
    const differenceInSeconds = Math.floor((currentTime - likedTime) / 1000);

    if (differenceInSeconds < 60) {
      return `${differenceInSeconds} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      const minutes = Math.floor(differenceInSeconds / 60);
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else if (differenceInSeconds < 86400) {
      const hours = Math.floor(differenceInSeconds / 3600);
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (differenceInSeconds < 2592000) {
      const days = Math.floor(differenceInSeconds / 86400);
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else {
      const months = Math.floor(differenceInSeconds / 2592000);
      return `${months} ${months === 1 ? "month" : "months"} ago`;
    }
  };

  useEffect(() => {
    const fetchStory = async () => {
      const response = await fetch(`${BACKEND_URL}/api/v1/user/get-story`);
      const data = await response?.json();
      setStories(data?.data);
    };
    fetchStory();
  }, []);

  const renderStoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.storyContainer}
      onPress={() => {
        console.log("ITEM---------->", item);
        setSelectedStory(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item?.story }} style={styles.storyImage} />
      <Text style={styles.username}>{item.username}</Text>
    </TouchableOpacity>
  );

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Story added",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
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

      let data = {
        userId: uid,
        story: downloadURL,
        username: "Aswin",
      };
      const response = await fetch(`${BACKEND_URL}/api/v1/user/upload-story`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response && response.ok) {
        showToastWithGravity();
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <AntDesign
          name="pluscircle"
          size={62}
          color="darkcyan"
          style={{ top: 0, position: "relative" }}
        />
      </TouchableOpacity>
      <FlatList
        data={stories}
        keyExtractor={(item) => item._id}
        renderItem={renderStoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modelHeader}>
            <View>
              <Text
                style={{
                  color: "white",
                  fontFamily: "sans-serif",
                  fontSize: 18,
                  top: 20,
                  position: "relative",
                  fontWeight: "bold",
                }}
              >
                {selectedStory?.username}
              </Text>
              <Text
                style={{
                  color: "white",
                  fontFamily: "sans-serif",
                  fontSize: 10,
                  top: 20,
                  position: "relative",
                }}
              >
                {formatTimeDifference(selectedStory?.createdAt)}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <AntDesign name="closecircle" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: selectedStory?.story }}
            style={styles.selectedStoryImage}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    margin: 4,
  },
  storyList: {
    paddingHorizontal: 10,
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#0EBD60",
  },
  username: {
    marginTop: 5,
    fontFamily: "sans-serif",
    color: "#333",
  },
  selectedStoryImage: {
    width: "100%",
    height: "50%",
    resizeMode: "cover",
  },
  modalContainer: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
    position: "relative",
    backgroundColor: "#1D1919",
    height: "100%",
  },
  modelHeader: {
    height: 80,
    padding: 10,
    backgroundColor: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    top: -5,
    position: "absolute",
    margin: 10,
  },
  closeButton: {
    top: 25,
    left: -10,
    position: "relative",
  },
});

export default Story;

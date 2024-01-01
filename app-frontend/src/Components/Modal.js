import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { styles } from "../Utils/styles";
import socket from "../Utils/socket";
import { BACKEND_URL } from "../Constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Modal = ({ setVisible }) => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");
  const closeModal = () => setVisible(false);
  const [key, setKey] = useState("");

  const fetchUser = async (value) => {
    let url = null;
    const storedData = await AsyncStorage.getItem("userData");
    if (storedData) {
      setUid(storedData);
    }
    if (!value || value.trim() === "") {
      url = `${BACKEND_URL}/api/v1/user/search-chat?userid=${uid}`; 
    } else {
      url = `${BACKEND_URL}/api/v1/user/search-chat?userid=${uid}&name=${value}`;
    }

    try {
      const response = await fetch(url);
      const data = await response?.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateRoom = () => {
    console.log({ groupName });
    socket.emit("createRoom", groupName);
    closeModal();
  };

  const handleAddChatUser = async (name) => {
    socket.emit("createRoom", name);
    const response = await fetch(
      `${BACKEND_URL}/api/v1/user/add-chat-user/${uid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(name),
      }
    );
    if (response.ok) {
      console.log("chat user added");
    } else {
      console.log("Error while adding chat user");
    }
    closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalsubheading}>Search by name</Text>
      <TextInput
        style={styles.modalinput}
        placeholder="Search a name"
        onChangeText={(value) => fetchUser(value)}
      />

      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.userItemContainer}>
              <Image
                source={{ uri: item.profileImage }}
                style={styles.userItemImage}
              />
              <TouchableOpacity
                onPress={() => handleAddChatUser(item)}
                style={styles.userInfoContainer}
              >
                <Text style={styles.username}>{item.username}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text>No users found</Text>
      )}

      <View style={styles.modalbuttonContainer}>
        <Pressable
          style={[styles.modalbutton, { backgroundColor: "whitesmoke" }]}
          onPress={closeModal}
        >
          <Text style={styles.modaltext}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;

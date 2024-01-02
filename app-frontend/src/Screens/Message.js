import React, { useState, useLayoutEffect, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ChatComponent from "../Components/ChatComponent";
import { styles } from "../Utils/styles";
import Modal from "../Components/Modal";
import { BACKEND_URL } from "../Constants/Api";
import socket from "../Utils/socket";
import { EvilIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllMessagesScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");

  const [rooms, setRooms] = useState([]);

  useLayoutEffect(() => {
    const fetchGroups = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUid(storedData);
      }

      fetch(`${BACKEND_URL}/api/v1/user/chat-users/${uid}`)
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRooms(data);
          }
        })
        .catch((err) => console.error(err));
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    // socket.on("roomsList", (rooms) => {
    //   setRooms(rooms);
    // });
    const fetchGroups = async () => {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        setUid(storedData);
      }

      fetch(`${BACKEND_URL}/api/v1/user/chat-users/${uid}`) 
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRooms(data);
          }
        })
        .catch((err) => console.error(err));
    };
    fetchGroups();
  }, [socket]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userContainer}
      onPress={() =>
        navigation.navigate("Chat", { userId: item.id, userName: item.name })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.lastChat}>{item.lastChat}</Text>
      </View>
      {item.newMessages > 0 && (
        <View style={styles.newMessageBadge}>
          <Text style={styles.newMessageCount}>{item.newMessages}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chattopContainer}>
        <View style={styles.chatheader}>
          <Text style={styles.chatheading}>Messages</Text>
          <Pressable onPress={() => setVisible(true)}>
            {/* <Feather name="edit" size={24} color="#0E3D8B" /> */}
            <EvilIcons name="search" size={24} color="#0E3D8B" />
          </Pressable>
        </View>
      </View>
      {console.log("ROOMS===========>", rooms ? rooms : "no rooms")}
      <View style={styles.chatlistContainer}>
        {rooms?.length > 0 ? (
          <FlatList
            data={rooms}
            renderItem={({ item }) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <View style={styles.chatemptyContainer}>
            <Text style={styles.chatemptyText}>No Chat!</Text>
            <Text>Click the icon above to start a new chat</Text>
          </View>
        )}
      </View>
      {visible ? <Modal setVisible={setVisible} /> : ""}
    </SafeAreaView>
  );
};

export default AllMessagesScreen;

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

const AllMessagesScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  // const rooms = [
  //   {
  //     id: "1",
  //     name: "Novu Hangouts",
  //     messages: [
  //       {
  //         id: "1a",
  //         text: "Hello guys, welcome!",
  //         time: "07:50",
  //         user: "Tomer",
  //       },
  //       {
  //         id: "1b",
  //         text: "Hi Tomer, thank you! 😇",
  //         time: "08:50",
  //         user: "David",
  //       },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Hacksquad Team 1",
  //     messages: [
  //       {
  //         id: "2a",
  //         text: "Guys, who's awake? 🙏🏽",
  //         time: "12:50",
  //         user: "Team Leader",
  //       },
  //       {
  //         id: "2b",
  //         text: "What's up? 🧑🏻‍💻",
  //         time: "03:50",
  //         user: "Victoria",
  //       },
  //     ],
  //   },
  // ];

  const [rooms, setRooms] = useState([]);

  //👇🏻 Runs when the component mounts
  useLayoutEffect(() => {
    function fetchGroups() {
      fetch(`${BACKEND_URL}/api`)
        .then((res) => res.json())
        .then((data) => setRooms(data))
        .catch((err) => console.error(err));
    }
    fetchGroups();
  }, []);

  //👇🏻 Runs whenever there is new trigger from the backend
  useEffect(() => {
    socket.on("roomsList", (rooms) => {
      setRooms(rooms);
    });
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
            <Feather name="edit" size={24} color="#0E3D8B" />
          </Pressable>
        </View>
      </View>

      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
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

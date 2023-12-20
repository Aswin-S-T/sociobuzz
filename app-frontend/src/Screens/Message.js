import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const Message = ({ navigation }) => {
  const users = [
    {
      id: "1",
      name: "John Doe",
      lastChat: "Hello there!",
      newMessages: 3,
      imageUrl: "https://placekitten.com/50/50",
    },
    {
      id: "2",
      name: "Jane Doe",
      lastChat: "How are you?",
      newMessages: 1,
      imageUrl: "https://placekitten.com/51/50",
    },
  ];

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
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.userList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: "sans-serif-medium",
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 5,
  },
  lastChat: {
    fontFamily: "sans-serif-light",
    color: "#666",
    fontWeight: "400",
  },
  newMessageBadge: {
    backgroundColor: "#4caf50",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  newMessageCount: {
    fontFamily: "sans-serif-medium",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  userList: {
    paddingTop: 10,
  },
});

export default Message;

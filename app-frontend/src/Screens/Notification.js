import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const Notification = () => {
  const notifications = [
    { id: "1", text: "You have a new message", imageUrl: "https://placekitten.com/50/50" },
    { id: "2", text: "A friend mentioned you in a post", imageUrl: "https://placekitten.com/50/51" },
    // Add more notifications as needed
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.profileImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>{item.text}</Text>
        <Text style={styles.notificationTime}>2 hours ago</Text>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#fff", height: "100%" }}>
      <View style={styles.headerContainer}>
        <Text style={styles.notificationHeaderText}>Notifications</Text>
        <Text style={styles.notificationSubText}>
          You have <Text style={styles.notificationCount}>4 messages</Text> Today
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    margin: 10,
  },
  notificationHeaderText: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#111",
    fontWeight: "bold",
  },
  notificationSubText: {
    fontFamily: "sans-serif",
    color: "#666",
    fontWeight: "500",
  },
  notificationCount: {
    fontFamily: "sans-serif",
    color: "darkcyan",
    fontWeight: "bold",
  },
  notificationList: {
    paddingHorizontal: 10,
  },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontFamily: "sans-serif",
    color: "#333",
    fontWeight: "600",
    marginBottom: 5,
  },
  notificationTime: {
    fontFamily: "sans-serif",
    color: "#666",
    fontWeight: "400",
  },
});

export default Notification;

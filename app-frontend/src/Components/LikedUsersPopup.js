import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

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

const LikedUsersPopup = ({ postId, likedUsers, onClose }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Liked Users</Text>

          <FlatList
            data={likedUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.userContainer}>
                <Text>{item.username}</Text>
                <Text style={styles.timeAgo}>
                  {formatTimeDifference(item.time)}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
    height: 500,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  userContainer: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeAgo: {
    color: "#777",
  },
  separator: {
    height: 10,
    backgroundColor: "#fff",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LikedUsersPopup;

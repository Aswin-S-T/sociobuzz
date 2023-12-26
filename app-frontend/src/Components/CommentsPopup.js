import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";

const CommentsPopup = ({ comments, onClose }) => {
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
  console.log("COmments------------", comments);
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Comments</Text>
          <ScrollView>
            <FlatList
              data={comments}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <>
                  <View style={styles.userContainer}>
                    <Text
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        fontFamily: "sans-serif",
                      }}
                    >
                      {item.username}
                    </Text>
                    <Text style={styles.timeAgo}>
                      {formatTimeDifference(item.time)}
                    </Text>
                  </View>
                  <View style={styles.commentContainer}>
                    <Text
                      style={{
                        color: "grey",
                        fontFamily: "sans-serif",
                        fontSize: 13,
                      }}
                    >
                      {item.comment}
                    </Text>
                  </View>
                </>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </ScrollView>
          <View style={{display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
            <TextInput
              style={{
                top: 20,
                position: "relative",
                background: "transparent",
                width:'100%',
                border: "none",
                padding: 10,
                outline: "none",
                borderRadius: 20,
                borderBottomWidth: 1,
                borderBottomColor: "grey",
              }}
              placeholder="Write a comment...."
            />
            <TouchableOpacity style={{top:30,position:'relative',width:50,height:40,backgroundColor:'lightgrey',borderRadius:8,color:"#111",display:'flex',justifyContent:'center',alignItems:'cemter'}}>
              <View>
                <Text style={{left:5,position:'relative'}}>Post</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    padding: 29,
    borderRadius: 10,
    width: "80%",
    maxHeight: "90%",
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
    height: 5,
    backgroundColor: "#fff",
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    top: 20,
    position: "relative",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CommentsPopup;

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Post from "../Components/Post";

const Profile = () => {
  return (
    <ScrollView>
      <View style={{ backgroundColor: "#fff", height: "100%" }}>
        <View style={styles.postContainer}>
          <Image
            style={styles.profilePic}
            source={
              "data:image/jpeg;base64,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"
            }
          />
          <View
            style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
          >
            <View style={{ left: -60, position: "relative" }}>
              <View style={styles.bold}>Deepika Padukone</View>
              <View style={styles.semibold}>Actess & Musician</View>
            </View>
            <View
              style={{
                flexDirection: "row",
                left: -70,
                position: "relative",
                margin: 10,
              }}
            >
              <View>
                <View style={styles.bold}>657 </View>
                <View style={styles.semibold}>Followers</View>
              </View>
              <View style={{ left: 50, position: "relative" }}>
                <View style={styles.bold}>657 </View>
                <View style={styles.semibold}>Following</View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 10,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: "#74DF00",
                color: "#fff",
                minWidth: 100,
                borderRadius: 24,
                left: -5,
                position: "relative",
              }}
            >
              <Text
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                  fontFamily: "sans-serif",
                }}
              >
                Follow
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={{
                padding: 7,
                backgroundColor: "lightgray",
                color: "#111",
                minWidth: 100,
                borderRadius: 24,
                left: 5,
                position: "relative",
              }}
            >
              <Text
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#111",
                  fontFamily: "sans-serif",
                }}
              >
                Message
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line}></View>
        <View>
          <Post />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: "50%",
  },
  profileDetails: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  bold: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "#111",
    fontSize: 17,
  },
  semibold: {
    fontFamily: "sans-serif",
    fontWeight: 500,
    color: "#444",
    marginTop: 8,
    fontSize: 13,
  },
  line: {
    borderBottomColor: "#4444",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Profile;

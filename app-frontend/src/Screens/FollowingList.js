import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../Constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../Utils/styles";
import { FontAwesome } from "@expo/vector-icons";

const FollowingList = () => {
  const [value, setValue] = useState("");
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");
  const [followers, setFollowers] = useState([]);

  const fetchUser = async (value) => {
    let url = null;
    const storedData = await AsyncStorage.getItem("userData");
    if (storedData) {
      setUid(storedData);
    }
    if (!value || value.trim() === "") {
      url = `${BACKEND_URL}/api/v1/user/following?userid=${uid}`;
    } else {
      url = `${BACKEND_URL}/api/v1/user/following?userid=${uid}&name=${value}`;
    }

    try {
      const response = await fetch(url);
      const data = await response?.json();
      if (data) {
        setFollowers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const unfollowUser = async (targetId) => {
    let url = `${BACKEND_URL}/api/v1/user/unfollow`;
    let data = {
      userId: uid,
      targetId,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      ToastAndroid.showWithGravity(
        "Unfollowed",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
      setFollowers((prevFollowers) =>
        prevFollowers.filter((follower) => follower._id !== targetId)
      );
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={styles.sameRow}>
        <TextInput
          style={styles.modalinput}
          placeholder="Search a name"
          onChangeText={(value) => fetchUser(value)}
        />
        <FontAwesome
          style={{ left: -35, top: 9, position: "relative" }}
          name="search"
          size={22}
          color="darkblue"
        />
      </View>
      <View style={{ top: 10, position: "relative" }}>
        <Text
          style={{
            fontWeight: "400",
            color: "darkblue",
            fontFamily: "sans-serif",
          }}
        >
          Following ({followers?.length})
        </Text>
        {followers.length > 0 ? (
          <View style={{ top: 20, position: "relative", marginBottom: 35 }}>
            <FlatList
              data={followers}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.userItemContainer}>
                  <Image
                    source={{ uri: item.profileImage }}
                    style={styles.userItemImage}
                  />
                  <TouchableOpacity
                    // onPress={() => handleAddChatUser(item)}
                    style={styles.userInfoContainer}
                  >
                    <Text style={styles.username}>{item.username}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.unFOllowBtn}
                    onPress={() => unfollowUser(item?._id)}
                  >
                    <Text style={{ color: "white", fontFamily: "sans-serif" }}>
                      Unfollow
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        ) : (
          <View style={{ top: 40, position: "relative" }}>
            <Text>No users found</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FollowingList;

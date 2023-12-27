import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import LikedUsersPopup from "./LikedUsersPopup";
import CommentsPopup from "./CommentsPopup";
import { BACKEND_URL } from "../Constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnlargedImageModal from "./EnlargedImageModal";
import { useNavigation } from "@react-navigation/native";

const Post = ({ newpost }) => {
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");

  const handleOptionsPress = () => {
    setShowOptions(!showOptions);
  };

  const handleDeletePress = () => {
    setShowOptions(false);
  };

  const handleLikedUsersPress = () => {
    setShowLikedUsers(!showLikedUsers);
  };

  const handleCommentsPress = () => {
    setShowComments(!showComments);
  };

  const [post, setPost] = useState([]);
  const [showEnlargedImage, setShowEnlargedImage] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem("userData");

      const response = await fetch(
        "https://crowdly-2.onrender.com/api/v1/user/all-post"
      );
      const data = await response?.json();
      setPost(data?.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const likePost = async (postId) => {
    const url = `${BACKEND_URL}/api/v1/user/like-post/${postId}`;
    let likeData = {
      userId: uid,
      username: "test",
      time: new Date(),
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    });
    const data = await response?.json();
  };

  const navigateToUserProfile = (userId) => {
    navigation.navigate("UserProfile", { userId });
  };

  return (
    <ScrollView>
      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      ) : (
        newpost && (
          <View key={newpost._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <TouchableOpacity
                onPress={() => navigateToUserProfile(newpost?.userId)}
              >
                <Image source={{ uri: newpost?.image }} style={styles.avatar} />
              </TouchableOpacity>
              <Text style={styles.postComment}>{newpost?.caption}</Text>
              <TouchableOpacity onPress={handleOptionsPress}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              {showOptions && (
                <View style={styles.dropdownOptions}>
                  <TouchableOpacity onPress={handleDeletePress}>
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <TouchableOpacity onPress={() => setShowEnlargedImage(true)}>
              <Image
                source={{ uri: newpost?.image }}
                style={styles.postImage}
              />
            </TouchableOpacity>
            {showEnlargedImage && (
              <EnlargedImageModal
                visible={showEnlargedImage}
                imageUrl={newpost?.image}
                onClose={() => setShowEnlargedImage(false)}
              />
            )}

            <View style={styles.postActions}>
              <TouchableOpacity>
                <View style={styles.actionContainer}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{newpost.like.length}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCommentsPress}>
                <View style={styles.actionContainer}>
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{newpost.comment.length}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleLikedUsersPress}>
              <View style={{ margin: 10 }}>
                <Text style={{ color: "grey", fontFamily: "sans-serif" }}>
                  Liked by {newpost?.like?.length} peoples
                </Text>
              </View>
            </TouchableOpacity>

            {showLikedUsers && (
              <LikedUsersPopup
                likedUsers={newpost.like}
                onClose={() => setShowLikedUsers(false)}
              />
            )}

            {showComments && (
              <CommentsPopup
                postId={newpost?._id}
                comments={newpost.comment}
                onClose={() => setShowComments(false)}
              />
            )}
          </View>
        )
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    marginTop: 5,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postComment: {
    flex: 1,
    marginRight: 10,
    fontFamily: "sans-serif",
  },
  dropdownOptions: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Post;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Spinner from "react-native-loading-spinner-overlay";
import LikedUsersPopup from "./LikedUsersPopup";
import CommentsPopup from "./CommentsPopup";
import { BACKEND_URL } from "../Constants/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EnlargedImageModal from "./EnlargedImageModal";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const Post = ({ newpost }) => {
  const navigation = useNavigation();
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(newpost?.like?.length);
  const [isSaved, setIsSaved] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [savedList, setSavedList] = useState([]);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const storedData = await AsyncStorage.getItem("userData");

        let url = `https://sociobuzz.onrender.com/api/v1/user/details/${uid}`;

        const response = await fetch(url);
        const data = await response?.json();

        if (data && data?.data) {
          let saved_data = data?.data?.saved_post;
          setSavedList(saved_data);

          setProfileData(data?.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const userLikedPost = newpost.like.some((like) => like.userId === uid);
    setIsLiked(userLikedPost);
  }, [newpost.like, uid]);

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
    // setLoading(true);
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem("userData");

      const response = await fetch(
        "https://crowdly-2.onrender.com/api/v1/user/all-post"
      );
      const data = await response?.json();

      const currentSavedList = savedList || [];
      if (currentSavedList.length > 0) {
        const modifiedData = data?.data.map((post) => ({
          ...post,
          saved: savedList.includes(post._id),
        }));

        setPost(modifiedData);
      }
      // setLoading(false);
    };
    fetchData();
  }, []);

  const likePost = async (postId) => {
    console.log("Like button clicked :)");
    const url = `${BACKEND_URL}/api/v1/user/like-post/${postId}`;
    let likeData = {};
    const storedData = await AsyncStorage.getItem("userData");
    if (storedData) {
      likeData = { ...storedData };
    } else {
      likeData = {
        userId: uid,
        username: "test",
        time: new Date(),
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likeData),
    });
    if (response.ok) {
      setIsLiked(!isLiked);

      const updatedPostResponse = await fetch(
        `https://crowdly-2.onrender.com/api/v1/user/all-post/${postId}`
      );
      const updatedPostData = await updatedPostResponse.json();
      setLikeCount(updatedPostData?.data.like.length);
    }
  };

  const navigateToUserProfile = (userId) => {
    navigation.navigate("UserProfile", { userId });
  };

  const showToastWithGravity = () => {
    ToastAndroid.showWithGravity(
      "Post saved",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const savePost = async (postId) => {
    const url = `${BACKEND_URL}/api/v1/user/save-post/${postId}`;
    let saveData = {};
    const storedData = await AsyncStorage.getItem("userData");
    if (storedData) {
      saveData = { ...storedData };
    } else {
      saveData = {
        userId: uid,
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    });
    if (response && response.ok){
      showToastWithGravity()
    }
  };

  return (
    <ScrollView>
      {
        newpost && (
          <View key={newpost._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <TouchableOpacity
                onPress={() => navigateToUserProfile(newpost?.userId)}
              >
                <Image source={{ uri: newpost?.image }} style={styles.avatar} />
              </TouchableOpacity>
              <Text style={styles.postComment}>{newpost?.caption}</Text>
              <Text
                style={{
                  color: "#555",
                  left: -20,
                  position: "relative",
                  fontFamily: "sans-serif",
                  fontSize: 13,
                }}
              >
                {formatTimeDifference(newpost?.time)}
              </Text>
              {/* <TouchableOpacity onPress={handleOptionsPress}>
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>

              {showOptions && (
                <View style={styles.dropdownOptions}>
                  <TouchableOpacity onPress={handleDeletePress}>
                    <Text>
                      <Entypo name="block" size={20} color="black" /> Not
                      Interested
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleDeletePress}>
                    <Text>
                      <Entypo name="block" size={20} color="black" /> Not
                      Interested
                    </Text>
                  </TouchableOpacity>
                </View>
              )} */}
            </View>
            <TouchableWithoutFeedback
              onPress={() => setShowEnlargedImage(true)}
            >
              <Image
                onPress={() => setShowEnlargedImage(true)}
                source={{ uri: newpost?.image }}
                style={styles.postImage}
              />
            </TouchableWithoutFeedback>
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
                  <TouchableOpacity onPress={() => likePost(newpost?._id)}>
                    <View style={styles.actionContainer}>
                      <MaterialCommunityIcons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={24}
                        color={isLiked ? "red" : "black"}
                      />
                      <Text>{likeCount}</Text>
                    </View>
                  </TouchableOpacity>
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

              <TouchableOpacity onPress={() => savePost(newpost?._id)}>
                <MaterialCommunityIcons
                  name="bookmark-outline"
                  size={24}
                  color="black"
                  backgroundColor={newpost?.saved ? "black" : "white"}
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
                postId={newpost?._id}
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
      }
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
    zIndex: 1000, // Increase the zIndex value
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

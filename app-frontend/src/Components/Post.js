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


const Post = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLikedUsers, setShowLikedUsers] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await fetch(
        "https://crowdly-2.onrender.com/api/v1/user/all-post"
      );
      const data = await response?.json();
      setPost(data?.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      {console.log("Post--------------", post)}
      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      ) : (
        post &&
        post.length > 0 &&
        post.map((p) => (
          <View key={p._id} style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={{ uri: p?.image }} style={styles.avatar} />
              <Text style={styles.postComment}>{p?.caption}</Text>
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

            <Image
              source={{ uri: "https://placekitten.com/300/200" }}
              style={styles.postImage}
            />

            <View style={styles.postActions}>
              <TouchableOpacity onPress={handleLikedUsersPress}>
                <View style={styles.actionContainer}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{p.like.length}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCommentsPress}>
                <View style={styles.actionContainer}>
                  <MaterialCommunityIcons
                    name="comment-outline"
                    size={24}
                    color="black"
                  />
                  <Text>{p.comment.length}</Text>
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

           
            {showLikedUsers && (
              <LikedUsersPopup
                likedUsers={p.like}
                onClose={() => setShowLikedUsers(false)}
              />
            )}

           
            {showComments && (
              <CommentsPopup
                comments={p.comment}
                onClose={() => setShowComments(false)}
              />
            )}
          </View>
        ))
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
    height: 200,
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

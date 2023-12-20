import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Post = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionsPress = () => {
    setShowOptions(!showOptions);
  };

  const handleDeletePress = () => {
    setShowOptions(false);
  };

  return (
    <ScrollView>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: "https://placekitten.com/50/50" }}
            style={styles.avatar}
          />

          <Text style={styles.postComment}>This is a post comment</Text>

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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: "https://placekitten.com/50/50" }}
            style={styles.avatar}
          />

          <Text style={styles.postComment}>This is a post comment</Text>

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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: "https://placekitten.com/50/50" }}
            style={styles.avatar}
          />

          <Text style={styles.postComment}>This is a post comment</Text>

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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <Image
            source={{ uri: "https://placekitten.com/50/50" }}
            style={styles.avatar}
          />

          <Text style={styles.postComment}>This is a post comment</Text>

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
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="bookmark-outline"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
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
});

export default Post;

import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";

const Story = () => {
  const stories = [
    { id: "1", username: "John", imageUrl: "https://placekitten.com/60/60" },
    { id: "2", username: "Jane", imageUrl: "https://placekitten.com/61/60" },
    { id: "3", username: "Doe", imageUrl: "https://placekitten.com/62/60" },
    { id: "4", username: "John", imageUrl: "https://placekitten.com/60/60" },
    { id: "5", username: "Jane", imageUrl: "https://placekitten.com/61/60" },
    { id: "6", username: "Doe", imageUrl: "https://placekitten.com/62/60" },
  ];

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.storyImage} />
      <Text style={styles.username}>{item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        renderItem={renderStoryItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.storyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  storyList: {
    paddingHorizontal: 10,
  },
  storyContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#74DF00",
  },
  username: {
    marginTop: 5,
    fontFamily: "sans-serif",
    color: "#333",
  },
});

export default Story;

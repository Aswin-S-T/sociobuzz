import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Post from "../Components/Post";
import Story from "../Components/Story";

const Landing = () => {
  const [loading, setLoading] = useState(false);
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
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Story />
      <Post newpost={post} />
    </View>
  );
};

export default Landing;

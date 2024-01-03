import React, { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import Post from "../Components/Post";
import Story from "../Components/Story";
import Spinner from "react-native-loading-spinner-overlay";
import { StyleSheet, Button } from "react-native";
import { Video, ResizeMode } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [savedList, setSavedList] = useState([]);
  const [uid, setUid] = useState("637360dbc8559f2ffa05acd5");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData) {
          setUid(storedData)
        }
        let url = `https://sociobuzz.onrender.com/api/v1/user/details/${uid}`;

        const response = await fetch(url);
        const data = await response?.json();

        if (data && data?.data) {
          let saved_data = data?.data?.saved_post;
          setSavedList(saved_data);

          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      "https://crowdly-2.onrender.com/api/v1/user/all-post"
    );
    const data = await response?.json();
    const modifiedData = data?.data.map((post) => ({
      ...post,
      saved: savedList.includes(post._id),
    }));

    setPosts(modifiedData);

    setLoading(false);
    setRefreshing(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <Story />
      {loading ? (
        <>
          <Spinner
            visible={loading}
            textContent={"Loading..."}
            textStyle={{ color: "#FFF" }}
          />
        </>
      ) : (
        <>
          {/* <Video
            ref={video}
            // style={styles.video}
            style={{width:400,height:400}}
            source={{
              uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View>
            <Button
              title={status.isPlaying ? "Pause" : "Play"}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View> */}
          <FlatList
            data={posts}
            renderItem={({ item }) => <Post newpost={item} />}
            keyExtractor={(item) => item._id.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </>
      )}
    </View>
  );
};

export default Landing;

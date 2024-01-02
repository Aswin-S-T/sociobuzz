import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import { BACKEND_URL } from "../Constants/Api";
import Post from "../Components/Post";
import { Ionicons } from "@expo/vector-icons";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myPost, setMyPost] = useState([]);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [uid, setUid] = useState("");
  const [selectedTab, setSelectedTab] = useState("All Posts");
  const [savedPost, setSavedPost] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result?.assets[0]?.uri);
    }
  };

  const getBase64Image = async (image) => {
    try {
      if (image) {
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: FileSystem.EncodingType.Base64,
        });
        return base64;
      } else {
        throw new Error("Image URI is null or undefined");
      }
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  };

  const uploadPost = async () => {
    try {
      setLoading(true);

      const base64Image = await getBase64Image(image);

      const apiUrl = "https://sociobuzz.onrender.com/api/v1/user/add-post";
      //const apiUrl = 'http://192.168.214.245:5000/api/v1/user/add-post'
      const userId = "637360dbc8559f2ffa05acd5";
      const caption = "Add your caption here";
      const imageType = "jpg";
      const about = "About your post";

      const postData = {
        userId,
        caption,
        data: base64Image,
        imageType,
        about,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const responseData = await response.json();

      if (responseData.status === 200) {
        console.log("Post uploaded successfully!");
      } else {
        console.error("Error uploading post:", responseData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading post:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      let uid = "637360dbc8559f2ffa05acd5";
      setUid(uid);
      let url = `${BACKEND_URL}/api/v1/user/my-post/${uid}`;

      const response = await fetch(url);
      const data = await response?.json();
      if (data && data.data) {
        setMyPost(data?.data);
        setRefreshing(false);
      }
    };
    fetchPost();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const storedData = await AsyncStorage.getItem("userData");

      let uid = "637360dbc8559f2ffa05acd5";
      let url = `https://sociobuzz.onrender.com/api/v1/user/details/${uid}`;

      const response = await fetch(url);
      const data = await response?.json();

      if (data && data?.data) {
        setProfileData(data?.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
  };

  const handleNavigation = () => {
    navigation.navigate("Upload", {
      id: uid,
    });
  };
  const gotoFollowers = () => {
    navigation.navigate("Followers", {
      id: uid,
    });
  };
  const gotoFollowing = () => {
    navigation.navigate("Following", {
      id: uid,
    });
  };

  const gotoSettings = () => {
    navigation.navigate("Settings", {
      id: uid,
    });
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const fetchSavedPost = async () => {
    try {
      let url = `${BACKEND_URL}/api/v1/user/saved-post/${uid}`;

      const response = await fetch(url);
      const data = await response?.json();

      if (data) {
        setSavedPost(data);
        setRefreshing(false);
      }
    } catch (error) {
      console.log("Error while fetching saved post");
    }
  };

  return (
    <FlatList
      data={[{ key: "profile" }]}
      renderItem={({ item }) => (
        <>
          {loading ? (
            <>
              {/* <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: "#FFF" }}
              /> */}
              <ActivityIndicator size="small" color="#0000ff" />
            </>
          ) : (
            <>
              <View style={{ backgroundColor: "#fff", height: "100%" }}>
                <View style={styles.postContainer}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: profileData?.profileImage,
                    }}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginTop: 20,
                    }}
                  >
                    <View style={{ left: 9, position: "relative" }}>
                      <View style={styles.bold}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            fontFamily: "sans-serif",
                          }}
                        >
                          {profileData?.username}
                        </Text>
                      </View>
                      <View style={styles.semibold}>
                        <Text>{profileData?.bio}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity onPress={gotoSettings}>
                    <Ionicons
                      name="settings-sharp"
                      size={24}
                      color="black"
                      style={{ left: -5, position: "relative" }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    left: -50,
                    flexDirection: "row",
                    alignItems: "center",
                    position: "relative",
                    margin: 10,
                  }}
                >
                  <View>
                    <View style={styles.bold}>
                      <TouchableOpacity
                        onPress={gotoFollowers}
                        style={styles.followingBtn}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          {profileData?.followers?.length}
                        </Text>
                        <View style={styles.semibold}>
                          <Text
                            style={{
                              left: 4,
                              top: -2,
                              position: "relative",
                              color: "white",
                            }}
                          >
                            Followers
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ left: 50, position: "relative" }}>
                    <View style={styles.bold}>
                      <TouchableOpacity
                        onPress={gotoFollowing}
                        style={styles.followerBtn}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontFamily: "sans-serif",
                            color: "#111",
                            fontSize: 20,
                          }}
                        >
                          {profileData?.following?.length}
                        </Text>
                        <View style={styles.semibold}>
                          <Text
                            style={{
                              left: 4,
                              top: -2,
                              position: "relative",
                              color: "#111",
                            }}
                          >
                            Following
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ left: 100, position: "relative" }}>
                    <View style={styles.bold}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          color: "darkblue",
                          fontSize: 20,
                        }}
                      >
                        2
                      </Text>
                    </View>
                    <View style={styles.semibold}>
                      <Text>Posts</Text>
                    </View>
                  </View>
                </View>

                <View style={{ margin: 10 }}>
                  <Button title="Add Post" onPress={handleNavigation} />
                  {image && (
                    <>
                      <View
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          margin: 10,
                          top: 10,
                          position: "relative",
                        }}
                      >
                        <Image
                          source={{ uri: image }}
                          style={{ width: 200, height: 200 }}
                        />
                        <TextInput
                          style={{
                            top: 20,
                            position: "relative",
                            background: "transparent",
                            border: "none",
                            padding: 10,
                            outline: "none",
                            borderRadius: 20,
                            borderBottomWidth: 2,
                            borderBottomColor: "#0E3D8B",
                          }}
                          placeholder="Add a caption"
                        />
                        <TouchableOpacity
                          onPress={uploadPost}
                          style={{
                            borderRadius: 40,
                            backgroundColor: "#0E3D8B",
                            width: "50%",
                            color: "#fff",
                            padding: 10,
                            border: "none",
                            outline: "none",
                            marginTop: 20,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                              fontFamily: "sans-serif",
                              fontWeight: "bold",
                              color: "#fff",
                            }}
                          >
                            Upload
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </View>
                <View style={styles.line}></View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      selectedTab === "All Posts" && styles.activeTab,
                    ]}
                    onPress={() => handleTabChange("All Posts")}
                  >
                    <Text
                      style={
                        selectedTab === "All Posts" && styles.activeTabText
                      }
                    >
                      All Posts
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.tabButton,
                      selectedTab === "Saved Posts" && styles.activeTab,
                    ]}
                    onPress={() => {
                      handleTabChange("Saved Posts");
                      fetchSavedPost();
                    }}
                  >
                    <Text
                      style={
                        selectedTab === "Saved Posts" && styles.activeTabText
                      }
                    >
                      Saved Posts
                    </Text>
                  </TouchableOpacity>
                </View>

                {selectedTab === "All Posts" ? (
                  <View style={{ top: 15, position: "relative" }}>
                    {myPost?.length > 0 && (
                      <FlatList
                        data={myPost}
                        renderItem={({ item }) => <Post newpost={item} />}
                        keyExtractor={(item) => item._id.toString()}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                          />
                        }
                      />
                    )}
                  </View>
                ) : (
                  <View style={{ top: 15, position: "relative" }}>
                    {savedPost?.length > 0 && (
                      <FlatList
                        data={savedPost}
                        renderItem={({ item }) => <Post newpost={item} />}
                        keyExtractor={(item) => item._id.toString()}
                        refreshControl={
                          <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                          />
                        }
                      />
                    )}
                  </View>
                )}
              </View>
            </>
          )}
        </>
      )}
      keyExtractor={(item) => item.key}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
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
    borderRadius: 50,
  },
  profileDetails: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  bold: {
    fontFamily: "sans-serif",
    fontWeight: 600,
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
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    left: 20,
    position: "relative",
  },
  tabButton: {
    padding: 10,
    margin: 5,
  },
  activeTab: {
    borderBottomColor: "#0E3D8B",
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: "#111",
    fontFamily: "sans-serif",
    fontWeight: "bold",
  },
  followingBtn: {
    padding: 8,
    backgroundColor: "#0FC1DE",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    color: "white",
  },
  followerBtn: {
    padding: 8,
    backgroundColor: "whitesmoke",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 10,
    color: "white",
  },
});

export default Profile;

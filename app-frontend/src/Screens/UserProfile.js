import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button, FlatList,RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { BACKEND_URL } from "../Constants/Api";
import Spinner from "react-native-loading-spinner-overlay";
import Post from "../Components/Post";

const UserProfile = () => {
  const route = useRoute();
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [myPost, setMyPost] = useState([]);
  const [image, setImage] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  console.log("USER ID&&&&&&&&&&&&&&7", userId ? userId : "no userid");

  useEffect(() => {
    const fetchPost = async () => {
      let uid = userId ? userId : "637360dbc8559f2ffa05acd5";
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        let uid = userId ? userId : "637360dbc8559f2ffa05acd5";
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

    fetchUserData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView>
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
              <View style={{ left: -60, position: "relative" }}>
                <View style={styles.bold}>
                  <Text>{profileData?.username}</Text>
                </View>
                <View style={styles.semibold}>
                  <Text>Actess & Musician</Text>
                </View>
              </View>
            </View>
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
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: "darkblue",
                    fontSize: 20,
                  }}
                >
                  {profileData?.followers?.length}
                </Text>
              </View>
              <View style={styles.semibold}>
                <Text>Followers</Text>
              </View>
            </View>
            <View style={{ left: 50, position: "relative" }}>
              <View style={styles.bold}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    color: "darkblue",
                    fontSize: 20,
                  }}
                >
                  {profileData?.following?.length}
                </Text>
              </View>
              <View style={styles.semibold}>
                <Text>Following</Text>
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
                  {myPost?.length}
                </Text>
              </View>
              <View style={styles.semibold}>
                <Text>Posts</Text>
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
                    left:23,
                    position:'relative'
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
                    left:20,
                    position:'relative'
                  }}
                >
                  Message
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.line}></View>
          <View>
            {myPost?.length > 0 ? (
              <>
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
              </>
            ) : (
                <>
                    <View style={styles.messageText}>
                        <Text style={{fontFamily:'sans-serif',fontWeight:600}}>No post available</Text>
                    </View>
                </>
            )}
          </View>
        </View>
      </>
    )}
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
      left: 40,
      position: "relative",
    },
    messageText:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'sans-serif',
        fontSize:20,
        fontWeight:600
    }
  });

export default UserProfile;

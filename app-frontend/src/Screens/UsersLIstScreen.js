import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";

const UsersListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(
        "https://crowdly-2.onrender.com/api/v1/user/all-users"
      );
      const data = await response?.json();
      setUsers(data?.data);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Spinner
          visible={loading}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {users && users?.length > 0 ? (
            <View style={styles.userList}>
              {users.map((user, index) => (
                <View key={index} style={styles.cardContainer}>
                  <View style={styles.card}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: user?.profileImage,
                      }}
                    />
                    <Text style={styles.text}>{user?.username}</Text>
                    <TouchableOpacity style={styles.button}>
                      <Text style={{color:"white",fontFamily:'sans-serif'}}>Send request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text>No user found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
  },
  button:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:100,
    height:30,
    backgroundColor:'#0E3D8B',
    color:"white",
    fontFamily:'sans-serif',
    borderRadius:20,
    left:20,
    top:10,
    position:'relative'
  },
  userList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },
  card: {
    display:'flex',
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    justifyContent: "center",
    // alignItems: "center",
    borderRadius: 10,
    elevation: 5,
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 50,
    left: 40,
    position: "relative",
  },
  text:{
    fontFamily:'sans-serif',
    fontWeight:'bold',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    left:50,
    position:'relative'
  }
});

export default UsersListScreen;

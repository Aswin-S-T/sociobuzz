import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Screens/LoginScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import NotificationIconWithBadge from "./src/Components/NotificationIconWithBadge";
import UserProfile from "./src/Screens/UserProfile";
import ChatScreen from "./src/Screens/ChatScreen";
import Messaging from "./src/Screens/Messaging";
import UploadScreen from "./src/Components/UploadScreen";
import FollowersList from "./src/Screens/FollowersList";
import FollowingList from "./src/Screens/FollowingList";
import SettingsScreen from "./src/Screens/SettingsScreen";
import SecurityScreen from "./src/Screens/SecurityScreen";
import AboutUsPage from "./src/Pages/AboutUsPage";
import EditProfilePage from "./src/Pages/EditProfilePage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "./src/Constants/Api";
import RegistrationScreen from "./src/Screens/RegistrationScreen";
import ForegotPassword from "./src/Screens/ForegotPassword";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [uid, setUid] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  useEffect(() => {
    const initial = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userData");
        if (storedData && storedData.trim() !== "") {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      } finally {
        setLoading(false);
      }
    };
    initial();
  }, []);

  const fetchUser = async (value) => {
    let url = null;
    const storedData = await AsyncStorage.getItem("userData");

    if (storedData) {
      setUid(storedData);
    }
    if (!value || value.trim() === "") {
      url = `${BACKEND_URL}/api/v1/user/list-all-users`;
    } else {
      url = `${BACKEND_URL}/api/v1/user/list-all-users&key=${value}`;
    }

    try {
      const response = await fetch(url);
      const data = await response?.json();
      if (data) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSearch = async (text) => {
    setSearchQuery(text);

    if (users.length > 0) {
      const filtered = users.filter((user) =>
        user.username.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={loggedIn ? "Crowdly" : "Login"}>
          <Stack.Screen
            name="Crowdly"
            component={HomeScreen}
            options={({ navigation }) => ({
              headerTitle: "Crowdly",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
              headerRight: () => (
                <View
                  style={{
                    left: -20,
                    position: "relative",
                    flexDirection: "row",
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  {isSearchVisible && (
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search..."
                      onChangeText={handleSearch}
                      value={searchQuery}
                    />
                  )}
                  <MaterialIcons
                    name={isSearchVisible ? "close" : "search"}
                    size={24}
                    color="#0E3D8B"
                    style={{ marginRight: 15 }}
                    onPress={toggleSearchVisibility}
                  />
                  <View>
                    {/* <Ionicons name="notifications" size={20} color={"#0E3D8B"} /> */}
                    <NotificationIconWithBadge notificationCount={5} />
                  </View>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: "Login",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{
              headerTitle: "Profile",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Foregotpassword"
            component={ForegotPassword}
            options={{
              headerTitle: "Foregot password",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              headerTitle: "Chat",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Messaging"
            component={Messaging}
            options={{
              headerTitle: "Chat",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              headerTitle: "Upload post",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Followers"
            component={FollowersList}
            options={{
              headerTitle: "Followers",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Following"
            component={FollowingList}
            options={{
              headerTitle: "Following",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerTitle: "Settings",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Security"
            component={SecurityScreen}
            options={{
              headerTitle: "Security Options",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="About"
            component={AboutUsPage}
            options={{
              headerTitle: "About Us",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegistrationScreen}
            options={{
              headerTitle: "Register",
              headerStyle: {
                backgroundColor: "#0E3D8B",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfilePage}
            options={{
              headerTitle: "Edit Profile",
              headerStyle: {
                backgroundColor: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 5,
              },
              headerTitleStyle: {
                color: "#0E3D8B",
                fontWeight: "bold",
                fontFamily: "sans-serif",
              },
            }}
          />
        </Stack.Navigator>
        {isSearchVisible && searchQuery?.trim() !== "" && (
          <View style={styles.searchBox}>
            {/* <ScrollView style={{ height: 400 }}> */}
            <FlatList
              // style={{ height: 400 }}
              data={filteredUsers}
              keyExtractor={(item) => item?._id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                // onPress={() => navigateToUserProfile(item?._id)}
                >
                  <View style={styles.samerow}>
                    <Image
                      source={{ uri: item?.profileImage }}
                      style={styles.avatar}
                    />
                    <Text style={styles.searchResult}>{item.username}</Text>
                  </View>
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
            {/* </ScrollView> */}
          </View>
        )}
      </NavigationContainer>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "58%",
    top: 67,
    left: 85,
    position: "absolute",
  },
  searchInput: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    marginRight: 10,
    paddingLeft: 5,
    width: "80%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  searchResult: {
    fontSize: 16,
    marginVertical: 5,
  },
  separator: {
    height: 10,
    backgroundColor: "transparent",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 25,
    marginRight: 10,
  },
  samerow: {
    display: "flex",
    flexDirection: "row",
    margin: 5,
  },
});

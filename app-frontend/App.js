import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearchVisibility = () => {
    setIsSearchVisible((prev) => !prev);
  };

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login"> */}
      <Stack.Navigator>
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
                    onChangeText={(text) => {
                      // Handle search logic with the input text
                    }}
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
            headerTitle: "Login   Here",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
});

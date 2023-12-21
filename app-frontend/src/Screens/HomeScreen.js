import React from "react";
import { View, Text, TouchableOpacity, PermissionsAndroid } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Landing from "./Landing";
import Profile from "./Profile";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";

const PlusButton = ({ onPress }) => (
  <TouchableOpacity
    style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    onPress={onPress}
  >
    <View
      style={{
        backgroundColor: "#0E3D8B",
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
        elevation: 10, // for Android shadow
      }}
    >
      <Ionicons name="add" size={30} color="white" />
    </View>
  </TouchableOpacity>
);

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        tabBarLabel: "Landing",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-home"
            size={tabInfo.focused ? 20 : 18}
            color={"#0E3D8B"}
          />
        ),
      },
    },
    Message: {
      screen: Message,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="chatbox-sharp"
            size={tabInfo.focused ? 20 : 18}
            color={"#0E3D8B"}
          />
        ),
      },
    },
    Add: {
      screen: () => null,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: () => <PlusButton onPress={requestCameraPermission} />,
      },
    },
    Notification: {
      screen: Notification,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="notifications"
            size={tabInfo.focused ? 20 : 18}
            color={"#0E3D8B"}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "User",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="md-person-circle-outline"
            size={tabInfo.focused ? 26 : 20}
            color={"#0E3D8B"}
          />
        ),
      },
    },
  },
  {
    initialRouteName: "Landing",
    barStyle: { backgroundColor: "whitesmoke" },
  }
);

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Permission Request",
        message: "This app needs permission to access your files.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Permission granted");
      // Handle the logic for opening the file picker or camera
    } else {
      console.log("Permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Navigator = createAppContainer(TabNavigator);

const HomeScreen = () => {
  return <Navigator />;
};

export default HomeScreen;

import React from "react";
import { View, Text, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Landing from "./Landing";
import Profile from "./Profile";
import Search from "./Search";
import Message from "./Message";
import Notification from "./Notification";

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
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarLabel: "",
        tabBarIcon: (tabInfo) => (
          <Ionicons
            name="search"
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

const Navigator = createAppContainer(TabNavigator);

const HomeScreen = () => {
  return (
    <Navigator>
      <Landing />
    </Navigator>
  );
};

export default HomeScreen;

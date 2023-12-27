import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Profile from "./Profile"; // Import your existing Profile component

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile">
      <Drawer.Screen name="Profile" component={Profile} />
      {/* Add more screens as needed */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Screens/LoginScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";

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
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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

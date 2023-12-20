import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/Screens/LoginScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login"> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Crowdly"
          component={HomeScreen}
          options={{
            headerTitle: "Crowdly",
            headerStyle: {
              backgroundColor: "#fff",
              shadowColor: "rgba(0, 0, 0, 0.1)", // Shadow color
              shadowOffset: { width: 0, height: 2 }, // Shadow offset
              shadowOpacity: 0.8, // Shadow opacity
              shadowRadius: 20, // Shadow radius
              elevation: 5, // Elevation for Android
            },

            headerTitleStyle: {
              color: "#74DF00",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            },
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
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
});

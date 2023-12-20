import React from "react";
import { View, Text, Button } from "react-native";

const HomeScreen = ({ navigation, route }) => {
  const userId = route.params.userId;

  return (
    <View>
      <Text>Welcome User {userId}</Text>
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile", { userId })}
      />
      <Button
        title="User Page"
        onPress={() => navigation.navigate("User", { userId })}
      />
      <Button
        title="Notifications"
        onPress={() => navigation.navigate("Notifications", { userId })}
      />
    </View>
  );
};

export default HomeScreen;

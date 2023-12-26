import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationIconWithBadge = ({ notificationCount }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="notifications" size={20} color="#0E3D8B" />

      {notificationCount > 0 && (
        <View
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            // marginLeft: 5,
            paddingHorizontal: 5,
            justifyContent: "center",
            alignItems: "center",
            left:-5,
            position:'relative'
          }}
        >
          <Text style={{ color: "white", fontSize: 12 ,}}>
            {notificationCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default NotificationIconWithBadge;

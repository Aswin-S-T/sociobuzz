import { View, Text, Pressable, Image } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../Utils/styles";

const ChatComponent = ({ item }) => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState({});

  useLayoutEffect(() => {
    if (item && item.messages) {
      setMessages(item?.messages[item.messages.length - 1]);
    }
  }, []);

  const handleNavigation = () => {
    navigation.navigate("Messaging", {
      id: item.id,
      name: item.name,
    });
  };

  return (
    <Pressable style={styles.cchat} onPress={handleNavigation}>
      {item.profileImage ? (
        <Image source={{ uri: item.profileImage }} style={styles.cavatar} />
      ) : (
        <Ionicons
          name="person-circle-outline"
          size={45}
          color="black"
          style={styles.cavatar}
        />
      )}

      {item && (
        <View style={styles.crightContainer}>
          <View>
            <Text style={styles.cusername}>{item.username}</Text>

            <Text style={styles.cmessage}>
              {messages?.text ? messages.text : "Tap to start chatting"}
            </Text>
          </View>
          <View>
            <Text style={styles.ctime}>
              {messages?.time ? messages.time : "now"}
            </Text>
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default ChatComponent;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    { text: "Hello!", position: "left" },
    { text: "Hi there!", position: "right" },
    { text: "How are you?", position: "left" },
    { text: "I'm good, thanks!", position: "right" },
    { text: "What about you?", position: "right" },
    { text: "I'm doing well too!", position: "left" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, position: "right" }]);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={[
              styles.message,
              {
                alignSelf:
                  message.position === "left" ? "flex-start" : "flex-end",
                backgroundColor:
                  message.position === "left" ? "purple" : "#0E3D8B",
                padding: 10,
              },
            ]}
          >
            <Text style={{ color: "white" }}>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-end",
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    backgroundColor: "#e0e0e0",
    padding: 8,
    margin: 4,
    borderRadius: 8,
    maxWidth: "70%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatScreen;

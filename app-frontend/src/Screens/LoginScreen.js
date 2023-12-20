// App.js

import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Make API call to the Node.js backend
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Navigate to the home page on successful login
        navigation.navigate("Home", { userId: data.userId });
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ backgroundColor: "#00d9a3", height: "100%", padding: 15 }}>
      <Text style={{ color: "white" }}>Username</Text>
      <TextInput
        style={{
          marginTop: 20,
          backgroundColor: "white",
          padding: 10,
          border: "none",
          outline: "none",
          borderRadius: 20,
        }}
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <View style={{ marginTop: 40 }}>
        <Text style={{ color: "white" }}>Password</Text>
        <TextInput
          style={{
            marginTop: 20,
            borderRadius: 20,
            backgroundColor: "white",
            padding: 10,
            border: "none",
            outline: "none",
          }}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            borderRadius: 40,
            backgroundColor: "white",
            padding: 10,
            border: "none",
            outline: "none",
            marginTop: 10,
          }}
          onPress={handleLogin}
        >
          <Text style={{ display: "flex", justifyContent: "center" }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#ffff" }}>OR</Text>
          <TouchableOpacity
            style={{
              borderRadius: 40,
              backgroundColor: "white",
              fontFamily: "sans-serif",
              width: "100%",
              padding: 10,
              border: "none",
              outline: "none",
              marginTop: 10,
            }}
          >
            <Text style={{ display: "flex", justifyContent: "center" }}>
              Create new Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

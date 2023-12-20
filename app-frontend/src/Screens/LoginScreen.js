// App.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import AlertModal from "../Components/AlertModal";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
        setModalMessage(data.message);
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ backgroundColor: "#ffff", height: "100%", padding: 15 }}>
      <Image
        source={
          "https://img.freepik.com/free-vector/usability-testing-concept-illustration_114360-2456.jpg"
        }
        style={{ height: 200 }}
      />

      <View style={{ marginTop: 40 }}>
        <Text style={{ color: "#444" }}>Username</Text>
        <TextInput
          style={{
            marginTop: 20,
            backgroundColor: "white",
            border: "1px solid #74DF00",
            padding: 10,
            outline: "none",
            borderRadius: 20,
          }}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={{ marginTop: 40 }}>
          <Text style={{ color: "#444" }}>Password</Text>
          <TextInput
            style={{
              marginTop: 20,
              borderRadius: 20,
              backgroundColor: "white",
              padding: 10,
              border: "1px solid #74DF00",
              outline: "none",
              borderBottomWidth: 2,
              borderBottomColor: "#74DF00",
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
              backgroundColor: "#74DF00",
              color: "#fff",
              padding: 10,
              border: "none",
              outline: "none",
              marginTop: 10,
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <AlertModal
            visible={modalVisible}
            message={modalMessage}
            onClose={closeModal}
          />
          <View
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#444", top: -10, position: "relative" }}>
              Foregot password?
            </Text>
            <Text style={{ color: "#444" }}>OR</Text>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                backgroundColor: "#74DF00",
                color: "#fff",
                fontFamily: "sans-serif",
                width: "100%",
                padding: 10,
                border: "none",
                outline: "none",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                Create new Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

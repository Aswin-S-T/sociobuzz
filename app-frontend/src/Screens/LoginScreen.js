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
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://sociobuzz.onrender.com/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: username, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log('Your data after login  : ', data?.data?._id)
        await AsyncStorage.setItem('userData', JSON.stringify(data?.data?._id));
        navigation.navigate("Crowdly", { userId: data.userId });
        setLoading(false);
      } else {
        setModalMessage("Invalid email or password");
        setModalVisible(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={{ height: "100%" }}>
      {/* <Image
        source={
          "https://img.freepik.com/free-vector/usability-testing-concept-illustration_114360-2456.jpg"
        }
        style={{ height: 200,width:'100%' }}
      /> */}
      <View
        style={{
          backgroundColor: "#0E3D8B",
          height: 240,
          padding: 15,
          borderBottomLeftRadius: 60,
          borderBottomRightRadius: 60,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 40,
              fontFamily: "sans-serif",
              alignItems: "center",
            }}
          >
            Login Here
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 40, margin: 40 }}>
        <Text
          style={{
            color: "#222",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            marginLeft: 9,
          }}
        >
          Username
        </Text>
        <TextInput
          style={{
            top: 20,
            position: "relative",
            background: "transparent",
            border: "none",
            padding: 10,
            outline: "none",
            borderRadius: 20,
            borderBottomWidth: 2,
            borderBottomColor: "#0E3D8B",
          }}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <View style={{ marginTop: 40 }}>
          <Text
            style={{
              color: "#222",
              fontFamily: "sans-serif",
              fontWeight: "bold",
              marginLeft: 9,
            }}
          >
            Password
          </Text>
          <TextInput
            style={{
              top: 20,
              position: "relative",
              background: "transparent",
              border: "none",
              padding: 10,
              outline: "none",
              borderRadius: 20,
              borderBottomWidth: 2,
              borderBottomColor: "#0E3D8B",
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
              backgroundColor: "#0E3D8B",
              color: "#fff",
              padding: 15,
              border: "none",
              outline: "none",
              marginTop: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {loading ? <>Please wait....</> : <>Login</>}
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
            <Text style={{ color: "#0E3D8B", fontWeight: "bold" }}>OR</Text>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                backgroundColor: "gray",
                color: "#444",
                fontFamily: "sans-serif",
                width: "100%",
                padding: 10,
                border: "none",
                outline: "none",
                marginTop: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AlertModal from "../Components/AlertModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../Constants/Api";
import Icon from "react-native-vector-icons/FontAwesome";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showError, setShowErr] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setShowErr(false);
        await AsyncStorage.setItem("userData", JSON.stringify(data?.data?._id));
        navigation.navigate("Crowdly", { userId: data.userId });
        setLoading(false);
      } else {
        setLoading(false);
        setShowErr(true);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const doRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: "#fff",
            height: 280,
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
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4W1oSD4A2c0EHDoQ6NIel2HNeH9UNxt1VNLtCnoUh_fiX2K5Lpwn0z8fwvOWvKsUk5e4&usqp=CAU",
              }}
              style={{ width: "100%", height: 200 }}
            />
            <Text
              style={{
                color: "#0E3D8B",
                fontSize: 35,
                fontFamily: "sans-serif",
                alignItems: "center",
              }}
            >
              Login Here
            </Text>
          </View>
        </View>
        {showError && (
          <View
            style={{
              backgroundColor: "#FF7070",
              color: "white",
              padding: 20,
              margin: 20,
              borderRadius: 15,
            }}
          >
            <Text style={{ color: "white", fontFamily: "sans-serif" }}>
              * Invalid username or password
            </Text>
          </View>
        )}
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
              padding: 10,
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
                padding: 10,
                borderRadius: 20,
                borderBottomWidth: 2,
                borderBottomColor: "#0E3D8B",
              }}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 56,
                right: 10,
                zIndex: 1,
              }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye" : "eye-slash"}
                size={20}
                color="#0E3D8B"
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{
                borderRadius: 40,
                backgroundColor: "#0E3D8B",
                color: "#fff",
                padding: 15,
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
                onPress={doRegister}
                style={{
                  borderRadius: 40,
                  backgroundColor: "#A85FED",
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

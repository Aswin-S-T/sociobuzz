import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { BACKEND_URL } from "../Constants/Api";
import { useNavigation } from "@react-navigation/native";

const ForegotPassword = () => {
  const navigation = useNavigation();
  const [showError, setShowErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sendOTP, setSentOTP] = useState(false);
  const [newpassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showResetPassword, setResetPassword] = useState(false);
  const [error, setError] = useState(null);

  const sendVeificationCode = async () => {
    setLoading(true);
    const response = await fetch(
      `${BACKEND_URL}/api/v1/user/foregot-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (response.ok) {
      setSentOTP(true);
      setLoading(false);
      console.log("otp sent");
    } else {
      console.log("otp not sent");
    }
  };

  const handleForgotPassword = async () => {
    if (newpassword !== confirmPassword) {
      setError("Both password should be same");
    }
    const response = await fetch(`${BACKEND_URL}/api/v1/user/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });
    if (response.ok) {
      let url = `${BACKEND_URL}/api/v1/user/change-password`;
      const response1 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newpassword }),
      });
      if (response1.ok) {
        ToastAndroid.showWithGravity(
          "Password updated",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        navigation.navigate("Login");
      }
    } else {
      setError("Invalid OTP");
    }
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
                fontSize: 26,
                fontFamily: "sans-serif",
                alignItems: "center",
              }}
            >
              Foregot password
            </Text>
          </View>
        </View>
        {error !== null && (
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
              {error}
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
            Email
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
            placeholder="Enter the linked email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
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
              width: 100,
              top: 20,
              position: "relative",
            }}
            onPress={sendVeificationCode}
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
              {loading ? (
                <>Sending....</>
              ) : sendOTP ? (
                <>Resend OTP</>
              ) : (
                <>SEND OTP</>
              )}
            </Text>
          </TouchableOpacity>
          {sendOTP && (
            <View style={{ marginTop: 40 }}>
              <Text
                style={{
                  color: "#222",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                  marginLeft: 9,
                }}
              >
                OTP
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
                placeholder="OTP"
                value={otp}
                onChangeText={(text) => setOtp(text)}
              />
            </View>
          )}

          <View>
            <TextInput
              style={{
                top: 20,
                position: "relative",
                padding: 10,
                borderRadius: 20,
                borderBottomWidth: 2,
                borderBottomColor: "#0E3D8B",
              }}
              placeholder="Enter new password"
              value={newpassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <TextInput
              style={{
                top: 20,
                position: "relative",
                padding: 10,
                borderRadius: 20,
                borderBottomWidth: 2,
                borderBottomColor: "#0E3D8B",
              }}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </View>

          <View style={{ marginTop: 20 }}>
            <View
              style={{
                marginTop: 20,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity>
                <Text style={{ color: "#444", top: -10, position: "relative" }}>
                  Foregot password?
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "#0E3D8B", fontWeight: "bold" }}>OR</Text>
              <TouchableOpacity
                onPress={handleForgotPassword}
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
                  Change password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForegotPassword;

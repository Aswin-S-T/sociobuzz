import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 


const SettingsScreen = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const navigateToSecurity = () => {
    navigation.navigate("Security");
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={{ margin: 20, top: 0, position: "relative" }}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <MaterialIcons
              name="account-circle"
              size={24}
              color="#444"
              style={{ top: 25, position: "relative" }}
            />
            <Text style={{ left: 40, position: "relative", fontSize: 17,color:"#444" }}>
              Profile
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <FontAwesome5
              name="arrow-right"
              size={18}
              color="#444"
              style={{ top: 10, position: "relative" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20, top: -20, position: "relative" }}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <MaterialIcons
              name="security"
              size={24}
              color="#444"
              style={{ top: 25, position: "relative" }}
            />
            <Text style={{ left: 40, position: "relative", fontSize: 17 ,color:"#444"}}>
              Security
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <FontAwesome5
              name="arrow-right"
              size={18}
              color="#444"
              style={{ top: 10, position: "relative" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20, top: -40, position: "relative" }}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Ionicons
              name="md-information-circle-outline"
              size={24}
              color="#444"
              style={{ top: 25, position: "relative" }}
            />
            <Text style={{ left: 40, position: "relative", fontSize: 17 ,color:"#444"}}>
              About Us
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <FontAwesome5
              name="arrow-right"
              size={18}
              color="#444"
              style={{ top: 10, position: "relative" }}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ margin: 20, top: -60, position: "relative" }}>
        <TouchableOpacity
          onPress={navigateToProfile}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Foundation
              name="power"
              size={24}
              color="#444"
              style={{ top: 25, position: "relative" }}
            />
            <Text style={{ left: 40, position: "relative", fontSize: 17 ,color:"#444"}}>
              Logout
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <FontAwesome
              name="arrow-right"
              size={18}
              color="#444"
              style={{ top: 10, position: "relative" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;

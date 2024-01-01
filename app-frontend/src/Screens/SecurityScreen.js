import React from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet } from "react-native";

const SecurityScreen = () => {
  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <View style={styles.container}>
        {/* <Text style={styles.header}>Security Options</Text> */}

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Account Password</Text>
          <TouchableOpacity style={styles.option}>
            <Text>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text>Two-Factor Authentication</Text>
            <Switch />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Privacy Settings</Text>
          <TouchableOpacity style={styles.option}>
            <Text>Profile Visibility</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text>Messaging Preferences</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Login Activity</Text>
          <TouchableOpacity style={styles.option}>
            <Text>Active Sessions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text>Login History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Security Notifications</Text>
          <TouchableOpacity style={styles.option}>
            <Text>Alerts</Text>
            <Switch />
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text>Email Verification</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default SecurityScreen;

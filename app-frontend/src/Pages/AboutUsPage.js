import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";

const AboutUsPage = () => {
  const handleContactPress = () => {
    Linking.openURL("mailto:info.codecrafta@gmail.com");
  };

  return (
    <View style={{ backgroundColor: "white", height: "100%" }}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>About Us</Text>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Our Story</Text>
            <Text>
              Welcome to Crowdly! Founded in 2023, our journey began
              with a vision to create a positive and engaging social community.
              Explore our story and discover the passion that drives us forward.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Team Members</Text>
            <Text>
              Meet the Faces Behind Crowdly. Our diverse team brings a
              wealth of experience in technology, design, and community
              building. Learn more about the individuals dedicated to making
              your experience exceptional.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Contact Information</Text>
            <Text>
              Get in touch with us for any questions, feedback, or support:
            </Text>
            <TouchableOpacity
              onPress={handleContactPress}
              style={styles.contactButton}
            >
              <Text style={styles.contactButtonText}>Contact Us</Text>
            </TouchableOpacity>
            <Text style={styles.address}>
              Crowdly
              {"\n"}
              [Street Address, City, State, Zip Code]
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    paddingBottom: 40,
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
  contactButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  contactButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  address: {
    marginTop: 10,
  },
});

export default AboutUsPage;

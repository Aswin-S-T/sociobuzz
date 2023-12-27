import React from "react";
import { View, Image, Modal, StyleSheet } from "react-native";

const EnlargedImageModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Image source={{ uri: imageUrl }} style={styles.enlargedImage} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  enlargedImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
});

export default EnlargedImageModal;
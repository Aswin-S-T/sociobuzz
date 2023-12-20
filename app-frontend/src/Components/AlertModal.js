import React from "react";
import { Modal, View, Text, Button, TouchableOpacity } from "react-native";

const AlertModal = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#CEF6E3",
        }}
      >
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          <Text style={{fontFamily:'sans-serif'}}>{message}</Text>
          <TouchableOpacity
            style={{
                marginTop:10,
              borderRadius: 40,
              backgroundColor: "#74DF00",
              color: "#fff",
              padding: 10,
              border: "none",
              outline: "none",
              marginTop: 10,
            }}
            onPress={() => onClose()}
          >
            <Text style={{display:'flex',justifyContent:'center',fontFamily:'sans-serif',color:'white'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

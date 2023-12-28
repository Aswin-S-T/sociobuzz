import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { styles } from "../Utils/styles";
import socket from "../Utils/socket";

const Modal = ({ setVisible }) => {
    const [groupName, setGroupName] = useState("");

    //👇🏻 Function that closes the Modal component
    const closeModal = () => setVisible(false);

    //👇🏻 Logs the group name to the console
    const handleCreateRoom = () => {
        console.log({ groupName });
        socket.emit("createRoom", groupName);
        closeModal();
    };
    return (
        <View style={styles.modalContainer}>
            <Text style={styles.modalsubheading}>Search by name</Text>
            <TextInput
                style={styles.modalinput}
                placeholder='Search a name'
                onChangeText={(value) => setGroupName(value)}
            />

            <View style={styles.modalbuttonContainer}>
                <Pressable style={styles.modalbutton} onPress={handleCreateRoom}>
                    <Text style={[styles.modaltext,{color:'white'}]}>Select</Text>
                </Pressable>
                <Pressable
                    style={[styles.modalbutton, { backgroundColor: "whitesmoke" }]}
                    onPress={closeModal}
                >
                    <Text style={styles.modaltext}>Cancel</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Modal;
import { View, Text } from "react-native";
import React from "react";
import { useRoute } from '@react-navigation/native';

const UserProfile = () => {
    const route = useRoute();
  const { userId } = route.params; 
  console.log('USER ID&&&&&&&&&&&&&&7', userId ? userId : 'no userid')
  return (
    <View>
      <Text>UserProfile</Text>
    </View>
  );
};

export default UserProfile;

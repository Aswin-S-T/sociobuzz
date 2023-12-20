import { View, Text } from 'react-native'
import React from 'react'
import Post from '../Components/Post'
import Story from '../Components/Story'

const Landing = () => {
  return (
    <View style={{backgroundColor:"white",height:'100%'}}>
      <Story />
      <Post />
    </View>
  )
}

export default Landing
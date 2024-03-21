import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CustomeButton(props) {
  //in progrss not completed yet
  return (
        <TouchableOpacity  style={{...styles.button,...styles}}>
        <Text>{props.title}</Text>
        </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    button:{
        flex:1,
        width:'30%',
        height:50,
        backgroundColor:'green'
    }
})
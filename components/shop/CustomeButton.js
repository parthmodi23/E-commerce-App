import React from 'react'
import { View,Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function CustomeButton(props) {
  return (
        <TouchableOpacity  style={{...styles.button,...styles}}
        title={props.title} 
        onPress={props.onPress}>
  
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
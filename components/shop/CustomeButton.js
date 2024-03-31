import React from 'react'
import { View,Text, StyleSheet,TouchableOpacity } from 'react-native'

const CustomeButton=(props)=> {
  return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.button,...props.style}}>
        <Text style={{...styles.text,...props.style}}>{props.children}</Text>
        </TouchableOpacity>
  )
}

const  styles = StyleSheet.create({

  button:{
    backgroundColor:'lightgreen',
    height:40,
    width:'30%'
  },
  text:{
    padding:2,
    justifyContent:'center',
    textAlign:'center',

    fontFamily:fonts.commonfonts,

  }
})


export default CustomeButton;

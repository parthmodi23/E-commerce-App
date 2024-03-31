import React from 'react'
import {View,StyleSheet} from 'react-native'
const Card = (props) => {
  return (
    <View style={{...styles.cardview,...props.style}}>
      {props.children}  
    </View>
  )
}

const styles=StyleSheet.create({
    cardview:{
        //iphone specific
      shadowColor: 'black',
      shadowOpacity: 0.26,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      //android specific
      elevation: 5,
      borderRadius: 10,
      backgroundColor: 'white'
      ,paddingVertical:35,
      paddingHorizontal:10
    }
})

export default Card

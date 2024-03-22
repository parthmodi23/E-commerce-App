import React, { useState } from 'react'
import { View ,Button,Text, StyleSheet} from 'react-native'

const Orderdetails = (props) => {
    console.log("props data"+JSON.stringify(props.itemData.items))
    const [showdetails,setShowdetails] = useState(false)

  return (
    <View style={styles.mainframe}>
        <View style={styles.ordertime}>
        <Text>${props.totalAmount}</Text>
        <Text>{props.date}</Text>
        </View>
        <Button title={showdetails?'hide details':'show more details'} onPress={()=>{
            setShowdetails(prevstate=>!prevstate)
        }}/>
      {showdetails && (<View>
            {props.itemData.items.map((data)=>(
            <View style={styles.showdetails} key={data.productId}>
            <Text>{data.productTitle}</Text>
            <Text>{data.quantity}</Text>
            <Text>${data.sum}</Text>
            </View>))}
            </View>)}
    </View>
  )
}

const styles=StyleSheet.create({
    mainframe:{
        flex:1,
        backgroundColor:'#ffff',
        elevation:5,
        margin:15
    },
    showdetails:{
        flexDirection:'row',
        justifyContent:'space-around',
        margin:5
        
    },
    ordertime:{
        flexDirection:'row',
        justifyContent:'space-around',
        padding:10
    }
})

export default Orderdetails

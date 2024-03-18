import React from 'react'
import {View, Text} from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import orders from '../../store/reducer/orders'

const OrderScreen = () => {
    const orderdata=useSelector(state=>state.orders.orders)
    console.log(orderdata)
  return (
<View>
    <FlatList data={orderdata} 
                keyExtractor={item=>item.id}
                renderItem={itemData=><Text>{itemData.item.totalAmount}</Text>}
                
/>
</View>
  )
}

export default OrderScreen

import React, { useEffect, useState } from 'react'
import { View, Text } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import orders from '../../store/reducer/orders'
import Orderdetails from '../../components/shop/orderdetails'

const OrderScreen = () => {

  const [showdetails,setShowdetails] = useState(false)
  const orderdata = useSelector(state => state.orders.orders)
  console.log("this is inner" + JSON.stringify(orderdata))
  return (
    <View style={{flex:1}}>
      <FlatList data={orderdata}
        keyExtractor={item => item.id}
        renderItem={itemData => <Orderdetails
          totalAmount={itemData.item.totalAmount.toFixed(2)}
          date={itemData.item.redabledate}
          title={'show more details'}
          itemData={itemData.item}
        />}

      />
    </View>
  )
}

export default OrderScreen

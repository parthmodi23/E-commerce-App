import React, { useCallback, useEffect, useState } from 'react'
import { View, Text,Button, StyleSheet } from "react-native"
import { FlatList } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import * as orderActions from '../../store/actions/orders'
import Orderdetails from '../../components/shop/orderdetails'
import { ActivityIndicator } from 'react-native-paper'

const OrderScreen = () => {
dispatch=useDispatch()
const [isloading,setIsLoading]=useState(false)

const featchData=useCallback(async()=>{
  setIsLoading(true)
  dispatch(orderActions.featchOrder())
  setIsLoading(false)
},[dispatch,setIsLoading])

  useEffect(()=>{
    featchData()
  },[dispatch,featchData])
  
  const [showdetails,setShowdetails] = useState(false)
  const orderdata = useSelector(state => state.orders.orders)
  console.log("this is inner" + JSON.stringify(orderdata))

  if(isloading){
    return (<View style={styles.indicator}>
      <ActivityIndicator size="large" color='black' />
  </View>)
  }
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

styles=StyleSheet.create({
  indicator:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
})

export default OrderScreen

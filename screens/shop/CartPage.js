import React, { useState } from 'react'
import { FlatList, View, Text, Button, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import * as CartAction from '../../store/actions/cart'
import CartItem from '../../components/shop/cartItem'
import * as orderActions from '../../store/actions/orders'
import { ActivityIndicator } from 'react-native-paper'

const CartPage = props => {
    const dispatch = useDispatch()
    const [isloading,setIsLoading]=useState(false)
    const carttotalamount = useSelector(state => state.cart.totalAmount)
    console.log("carttotalamount" + JSON.stringify(carttotalamount))
    const cartItem = useSelector(state => {
        const transformedCartItem = [];

        for (const key in state.cart.products) {

            transformedCartItem.push({

                productId: key,
                productImage: state.cart.products[key].imageUrl,
                productTitle: state.cart.products[key].productTitle,
                productPrice: state.cart.products[key].productPrice,
                quantity: state.cart.products[key].quantity,
                sum: state.cart.products[key].sum
            })
        }
        //this is used to sort the array based on the product Id
        return transformedCartItem;
    })
    const sendOrder=async() => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(cartItem, carttotalamount))
        setIsLoading(false)
            }   

    const renderproductdata = (itemdata) => {
        console.log(itemdata)
        return (<CartItem
            imageUrl={itemdata.productImage}
            title={itemdata.productTitle}
            price={itemdata.productPrice}
            quantity={itemdata.quantity}
            id={itemdata.productId}
        />)
    }
    return (
        <View style={styles.Screen}>
            <View style={styles.totalcontainer}>
                <Text style={styles.totaltext}>
                    Total : <Text style={styles.amount}>${carttotalamount.toFixed(2)}</Text>
                </Text>
            {isloading ?<View style={styles.loader}><ActivityIndicator size="small" color="black"/></View>:
                    (
                <Button title='Order Now' onPress={sendOrder}
                    disabled={cartItem.length === 0}
                />
                )}
            </View>
            <View style={styles.productdetails}>
                <Text>Details</Text>
                <FlatList
                    data={cartItem}
                    renderItem={(itemdata) => (renderproductdata(itemdata.item))}
                />
            </View>
        </View>)
}

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        margin: 20,
    },
    totalcontainer: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: 'black',
        overflow: 'hidden'

    },
    loader:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'flex-end',
        marginHorizontal:20,
        marginVertical:1
    }
})

export default CartPage;
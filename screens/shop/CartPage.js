import React from 'react'
import { FlatList, View,Text,Button, StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'
import { useSelector } from 'react-redux'
import CartItem from '../../components/shop/cartItem'



const CartPage=props=>{

    const carttotalamount=useSelector(state=>state.cart.totalAmount)
    const cartItem = useSelector(state=>{
        const transformedCartItem =[];

        for(const key in state.cart.products){
 
            transformedCartItem.push({

                productId:key,
                productImage:state.cart.products[key].imageUrl,
                productTitle:state.cart.products[key].productTitle,
                productPrice:state.cart.products[key].productPrice,
                quantity:state.cart.products[key].quantity,
                sum:state.cart.products[key].sum
            })
        }
        //this is used to sort the array based on the product Id
        return transformedCartItem;
    })
    console.log(cartItem)

    const renderproductdata=()=>{
       return <CartItem
        image={cartItem.productImage} 
        title={cartItem.productTitle} 
        price={`${cartItem.productPrice}$`}
        quantity={cartItem.quantity}
          />
    }
return(
<View style={styles.Screen}>
<View style={styles.totalcontainer}> 
<Text style={styles.totaltext}>
Total : <Text style={styles.amount}>${carttotalamount.toFixed(2)}</Text>
</Text>
    <Button title='Order Now' onPress={()=>{
        console.log("order place sucessfully")
    }}
    disabled={cartItem.length===0}
/>
</View>
<View style={styles.productdetails}>
    <Text>Details</Text>
    <FlatList 
    data={cartItem}
    renderItem={renderproductdata}
    />
</View>
</View>)
}

const styles=StyleSheet.create({
    Screen:{
        flex:1,
        margin:20,
    },
    totalcontainer:{
        flexDirection:'row',
        backgroundColor:Colors.primary,
        borderWidth:2,
        alignItems:'center',
        justifyContent:'space-between',
        borderColor:Colors.alert
    }
})

export default CartPage;
import React, { useEffect } from "react";
import { FlatList,View,Text,StyleSheet,Button } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import ProductContainer from "../../components/ProductContainer";
import { combineTransition } from "react-native-reanimated";
import * as CartAction from '../../store/actions/cart'
import {HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomeHaderButton from "../../components/UI/HeaderButton";
const ProductOverviewScreen=(props)=>{
const productdata=useSelector(state=>state.products.availableProducts);
const Dispatch=useDispatch();
useEffect(()=>{
    props.navigation.setOptions({
        headerRight:()=> <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
        <Item title="cart"
        iconName="cart"
        onPress={()=>{
            props.navigation.navigate({
                name:'Your Cart'})}}
        />
        </HeaderButtons>
    })
})
    return(
            <FlatList
            data={productdata}
            keyExtractor={item=>item.id}
            renderItem={itemData=><ProductContainer image={itemData.item.imageUrl} title={itemData.item.title} price={itemData.item.price} 
            ViewDetails={()=>{
                props.navigation.navigate({
                    name:'ProductDetailspage',
                    params:{
                        productId:itemData.item.id,
                        productTitle:itemData.item.title,
                    }
                })
            }}
            addtocart={()=>{
                Dispatch(CartAction.addToCart(itemData.item))
            }}
            
            />

           

        
        }
        />
    )
}


const styles=StyleSheet.create({
    MainScreen:{
        flex:1,
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})

export default ProductOverviewScreen;

// import { StyleSheet, Text, View,FlatList } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux'


// const ProductOverviewScreen = (props) => {
//     const products = useSelector(state => state.products.availableProducts)//so here we can get our products and store them in a constant products by calling a useselector
//     return(
    
//         <View style={styles.MainScreen}>
//             <Text>
//                 Hello
//             </Text

//         </View>
//         // <FlatList
//         // data={products}
//         //    keyExtractor={item=>item.id}//this one is optional
//         //    renderItem={itemData=> <View><Text> {itemData.item.title}</Text></View>}
//         // />
//     )
// }
// const styles = StyleSheet.create({

//     MainScreen:{
//         flex:1,
//     }
// })
// export default ProductOverviewScreen;


// @react-native-masked-view/masked-view@0.3.1 - expected version: 0.3.0
// expo@50.0.7 - expected version: ~50.0.11
// react-native-reanimated@3.7.2 - expected version: ~3.6.2
// react-native-safe-area-context@4.9.0 - expected version: 4.8.2
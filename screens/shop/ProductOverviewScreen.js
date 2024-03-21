import React, { useEffect } from "react";
import { FlatList,View,Text,StyleSheet,Button } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import ProductContainer from "../../components/shop/ProductContainer";
import { combineTransition } from "react-native-reanimated";
import * as CartAction from '../../store/actions/cart'
import {HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomeHaderButton from "../../components/UI/HeaderButton";
const ProductOverviewScreen=(props)=>{
    
const productdata=useSelector(state=>state.products.availableProducts);
const Dispatch=useDispatch();
useEffect(()=>{
    props.navigation.setOptions({
        headerRight:()=> (
        <View>
        <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
        <Item title="cart"
        iconName="cart"
        onPress={()=>{
            props.navigation.navigate({
                name:'Your Cart'})}}
        />
        </HeaderButtons>
        </View>),
        headerLeft:()=>{
            return(
    <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
        <Item title="Menu"
        iconName="menu"
        onPress={()=>{
            props.navigation.openDrawer()
        }}/>
    </HeaderButtons>
    )}
    })
})
    return(
            <FlatList
            data={productdata}
            keyExtractor={item=>item.id}
            renderItem={itemData=>
            <ProductContainer 
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price} 
            buttonleft='details'
            buttonright='Add To Cart'
            leftpress={()=>{
                props.navigation.navigate({
                    name:'ProductDetailspage',
                    params:{
                        productId:itemData.item.id,
                        productTitle:itemData.item.title,
                    }
                })
            }}
            rigthpress={()=>{
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
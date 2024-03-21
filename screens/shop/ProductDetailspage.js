import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import * as CartAction from '../../store/actions/cart'
import ProductDetails from "../../components/shop/ProductDetails";

const ProductDitailspage=(props)=>{
    const Dispatch=useDispatch()
    const route=useRoute()
    const ProductId=route.params?.productId
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(itemData=>itemData.id===ProductId))
    console.log(selectedProduct)
    return(
        <View>
            <ScrollView>
            <ProductDetails 
            image={selectedProduct.imageUrl} 
            title={selectedProduct.title}
            price={selectedProduct.price} 
            productDetails={selectedProduct.description}
            buttontext={'Add To Cart'}
            buttonpress={()=>{
                Dispatch(CartAction.addToCart(selectedProduct))
            }}
            />
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    mainScrren:{
        flex:1,backgroundColor:'red',
        height:'100%',
        width:'100%'
    }})

export default  ProductDitailspage;
import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import * as CartAction from '../../store/actions/cart'
import ProductDetails from "../../components/shop/ProductDetails";
const ProductDitailspage=(props)=>{
    const route=useRoute()
    const ProductId=route.params?.productId
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(itemData=>itemData.id===ProductId))
    return(
        <View>
            <ScrollView>
            <ProductDetails image={selectedProduct.imageUrl} title={selectedProduct.title} price={selectedProduct.price} productDetails={selectedProduct.description}/>
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
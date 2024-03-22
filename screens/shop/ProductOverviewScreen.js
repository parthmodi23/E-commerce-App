import React, { useEffect } from "react";
import { FlatList,View,Text,StyleSheet,Button } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import ProductContainer from "../../components/shop/ProductContainer";
import { combineTransition } from "react-native-reanimated";
import * as CartAction from '../../store/actions/cart'
import * as productsActions from '../../store/actions/productaction';
import {HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomeHaderButton from "../../components/UI/HeaderButton";
const ProductOverviewScreen=(props)=>{
    
const productdata=useSelector(state=>state.products.availableProducts);
const Dispatch=useDispatch()

  useEffect(() => {
    Dispatch(productsActions.fetchProducts());
  }, [Dispatch]);

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


// import React, { useEffect } from 'react';
// import { FlatList, Button, Platform } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

// import HeaderButton from '../../components/UI/HeaderButton';
// import ProductItem from '../../components/shop/ProductItem';
// import * as cartActions from '../../store/actions/cart';
// import * as productsActions from '../../store/actions/products';
// import Colors from '../../constants/Colors';

// const ProductsOverviewScreen = props => {
//   const products = useSelector(state => state.products.availableProducts);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(productsActions.fetchProducts());
//   }, [dispatch]);

//   const selectItemHandler = (id, title) => {
//     props.navigation.navigate('ProductDetail', {
//       productId: id,
//       productTitle: title
//     });
//   };

//   return (
//     <FlatList
//       data={products}
//       keyExtractor={item => item.id}
//       renderItem={itemData => (
//         <ProductItem
//           image={itemData.item.imageUrl}
//           title={itemData.item.title}
//           price={itemData.item.price}
//           onSelect={() => {
//             selectItemHandler(itemData.item.id, itemData.item.title);
//           }}
//         >
//           <Button
//             color={Colors.primary}
//             title="View Details"
//             onPress={() => {
//               selectItemHandler(itemData.item.id, itemData.item.title);
//             }}
//           />
//           <Button
//             color={Colors.primary}
//             title="To Cart"
//             onPress={() => {
//               dispatch(cartActions.addToCart(itemData.item));
//             }}
//           />
//         </ProductItem>
//       )}
//     />
//   );
// };

// ProductsOverviewScreen.navigationOptions = navData => {
//   return {
//     headerTitle: 'All Products',
//     headerLeft: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Menu"
//           iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
//           onPress={() => {
//             navData.navigation.toggleDrawer();
//           }}
//         />
//       </HeaderButtons>
//     ),
//     headerRight: (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Cart"
//           iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//           onPress={() => {
//             navData.navigation.navigate('Cart');
//           }}
//         />
//       </HeaderButtons>
//     )
//   };
// };

// export default ProductsOverviewScreen;

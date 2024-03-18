import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { View, Text, StyleSheet, Image,Button } from 'react-native'
import { combineReducers } from "redux";
import fonts from "../../constants/fonts";
import { useDispatch } from "react-redux";
import * as CartAction from '../../store/actions/cart';
import { AntDesign } from '@expo/vector-icons';

const CartItem = (props) => {

    const Dispatch=useDispatch()
    console.log(props)
    console.log('hello')
    return <View style={styles.Mainscreen}>
        <View style={styles.middlecontainer}>
            <View style={styles.imagecontainer}>
            <Image style={styles.image} source={{uri:props.imageUrl}} />
            </View>
        <View style={styles.titletextcontainer}>
            <Text style={styles.title}>
                {props.title.length<11 ? props.title : props.title.substring(0,9)+'...'}
            </Text>
            <Text style={styles.price}>
                {props.price}
            </Text>
        <View style={styles.quantitycontainer}>
            <Button title='-' onPress={()=>Dispatch(CartAction.handlequantity(props.id))}/>
            <Text style={styles.quantitytext}>
                {props.quantity}
            </Text>
            <Button title='+' onPress={()=>Dispatch(CartAction.addToCart(props))} />
        </View>
        </View>
        </View>
       
    
        <View style={styles.icon}>
            <AntDesign name='delete' size={28} color='red'  onPress={()=>Dispatch(CartAction.removefromcart(props.id))} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    Mainscreen:{
        flex:1,
        height:100,
        borderRadius:10,
        borderWidth:1,
        flexDirection:'row',
        justifyContent:'space-between',
        overflow:'hidden',
        backgroundColor:'#ffff',
        elevation:5,
        margin:5
    },
    imagecontainer:{
        height:100,
        width:100,
    },
    image:{
        height:'100%',
        width:'100%',
        resizeMode:'cover'
    },
    middlecontainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        justifyContent:'space-evenly',
        
    },
    quantitycontainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    quantitytext:{
        fontSize:20,
        padding:5
    },
    icon:{
        justifyContent:'center',
        alignItems:'center',
        margin:5
    },titletextcontainer:{
        fontFamily:fonts.commonfonts,
        justifyContent:'space-evenly',
        margin:5
    }

})
export default CartItem
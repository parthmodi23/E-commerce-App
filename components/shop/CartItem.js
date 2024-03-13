import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native'
import { Button } from "react-native-paper";

const CartItem = props => (
    <View style={styles.Mainscreen}>
        <View style={styles.imagecontainer}>
            <Image style={styles.image} source={{uri:props.image}} />
        </View>
        <View style={styles.titlecontainer}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text style={styles.price}>
                {props.price}
            </Text>
        </View>
        <View style={styles.quantitycontainer}>
            <Button title='+' />
            <Text style={styles.quantitytext}>
                {props.quantity}
            </Text>
            <Button title='-' />
        </View>
    </View>
)

const styles = StyleSheet.create({
    Mainscreen:{
        flex:1,
        backgroundColor:'red'
    },
    imagecontainer:{
        height:100,
        width:100
    },
    image:{
        height:'100%',
        width:'100%',
        overflow:'hidden'
    }

})
export default CartItem
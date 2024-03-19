import React from "react";
import { View,StyleSheet,Text,Image, Button } from "react-native";
import fonts from "../../constants/fonts";
import CustomeButton from "./CustomeButton";

const ProductDetails=(props)=>{
    return(
<View style={styles.mainContainer}>
    <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:props.image}} />
    </View>
    <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.price}>${props.price.toFixed(2)}</Text>
    </View>
   
    <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={props.ViewDetails}>
                        <Text style={styles.buttonText}>{props.buttonleft}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={props.addtocart}>
                        <Text style={styles.buttonText}>{props.buttonright}</Text>
                    </TouchableOpacity>
                </View>
    <View>   
        <Text style={styles.details}>{props.productDetails}</Text>
    </View>
</View>       
    )
}

const styles=StyleSheet.create({
    mainContainer:{
        flex:1,
    },
    imageContainer:{
        height:300,
        width:'100%',
        overflow:'hidden'
    },
    image:{
        height:'100%',
        width:'100%',
    },
    title:{
        fontSize:15,
        margin:5,
        fontFamily:fonts.commonfonts
    }
    ,price:{
        fontSize:15,
        margin:5,
        color:'#888',
        fontFamily:fonts.commonfonts
    },button:{
        flexDirection:'row',
        justifyContent:"space-around",
        margin:5
    },
    textContainer:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    details:{
        fontFamily:fonts.commonfonts,
        margin:20
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor:'#d64d'
    },
    buttonText: {
        color: 'white',
        fontFamily: fonts.commonfonts
    },
    textContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
})


export default ProductDetails;
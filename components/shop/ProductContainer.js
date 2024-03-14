import React from "react";
import {View,Text,StyleSheet, Image,Button, Platform,TouchableOpacity,TouchableNativeFeedback} from 'react-native'
import fonts from "../../constants/fonts";


const ProductContainer=(props)=>{
let TouchableComponents =TouchableOpacity
    if(Platform.OS=='android' && Platform.Version>=21){
        TouchableComponents=TouchableNativeFeedback
    }
    return(
<TouchableComponents onPress={props.ViewDetails} useforeground>

<View style={styles.mainContainer}>

    <View style={styles.imageContainer}>
    <Image style={styles.image} source={{uri:props.image}} />
    </View>
    <View style={styles.textContainer}>
    <Text style={styles.title}>{props.title}</Text>
    <Text style={styles.price}>${props.price.toFixed(2)}</Text>
    </View>

    <View style={styles.button}>
     <Button title='details' onPress={props.ViewDetails}/>
     <Button title='Add To Cart' onPress={props.addtocart}/>
    </View> 
</View>
</TouchableComponents>     

    )
}

const styles=StyleSheet.create({
    mainContainer:{
        margin:20,
        height:300,
        borderRadius:10,
        borderWidth:0.5,
        overflow:'hidden',
        backgroundColor:'white',
        elevation:6
    },
    imageContainer:{
        height:'60%',
        width:'100%',
        overflow:'hidden'
    },
    image:{
        height:'100%',
        width:'100%',
    },
    title:{
        fontFamily:fonts.commonfonts

    }
    ,price:{
        marginVertical:2,
        color:'#888',
        fontFamily:fonts.commonfonts

    },button:{
        flexDirection:'row',
        justifyContent:"space-around",
        margin:5,
        zIndex:5
    },
    textContainer:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        margin:10
    },
    ViewDetails:{
        backgroundColor:'red',
    }
})


export default ProductContainer;
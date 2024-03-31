import React from "react";
import { View, Text, StyleSheet, Image, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import fonts from "../../constants/fonts";
import CustomeButton from "./CustomeButton";


const ProductContainer = (props) => {
    let TouchableComponents = TouchableOpacity
    if (Platform.OS == 'android' && Platform.Version >= 21) {
        TouchableComponents = TouchableNativeFeedback
    }
    return (
        <TouchableComponents onPress={props.leftpress} useforeground>

            <View style={styles.mainContainer}>

                <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>

                <View style={styles.buttonContainer}>
                <CustomeButton style={{...styles.button,}} onPress={props.leftpress}>
                {props.buttonleft}

</CustomeButton>
<CustomeButton style={{...styles.button,...styles.buttonText}} onPress={props.rightpress}>
    {props.buttonright}
</CustomeButton>
</View>
            </View>
        </TouchableComponents>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal:35,
        marginVertical:20,
        height:300,
        borderRadius: 10,
        borderWidth: 0.5,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 6,
    },
    imageContainer: {
        height: '65%',
        width: '100%',
        overflow: 'hidden'
    },
    image: {
        height: '100%',
        width: '100%',
        resizeMode:'stretch'

    },
    title: {
        fontFamily: fonts.commonfonts

    }
    , price: {
        marginVertical: 2,
        color: '#888',
        fontFamily: fonts.commonfonts

    },
    textContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ViewDetails: {
        backgroundColor: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        borderRadius: 5,
        backgroundColor: '#d63d',
        justifyContent:'center',
        padding:1.4
      
    },
    buttonText: {
        color:'black',
        fontFamily: fonts.commonfonts
    },
    textContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    }
})


export default ProductContainer;
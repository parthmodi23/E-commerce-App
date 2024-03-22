import React from "react";
import { View, Text, StyleSheet, Image, Button, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import fonts from "../../constants/fonts";


const ProductContainer = (props) => {
    let TouchableComponents = TouchableOpacity
    if (Platform.OS == 'android' && Platform.Version >= 21) {
        TouchableComponents = TouchableNativeFeedback
    }
    return (
        <TouchableComponents onPress={props.leftpress} useforeground>

            <View style={styles.mainContainer}>

                {/* <View style={styles.imageContainer}> */}
                <Image style={styles.image} source={{ uri: props.image }} />
                {/* </View> */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={props.leftpress}>
                        <Text style={styles.buttonText}>{props.buttonleft}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={props.rigthpress}>
                        <Text style={styles.buttonText}>{props.buttonright}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableComponents>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 20,
        height: 300,
        borderRadius: 10,
        borderWidth: 0.5,
        overflow: 'hidden',
        backgroundColor: 'white',
        elevation: 6,
    },
    imageContainer: {
        height: '60%',
        width: '100%',
        overflow: 'hidden'
    },
    image: {
        height: '60%',
        width: '100%',
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
        margin: 10
    },
    ViewDetails: {
        backgroundColor: 'red',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 5,
        zIndex: 5
    },
    button: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#d64d'
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


export default ProductContainer;
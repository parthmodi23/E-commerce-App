import React, { useEffect } from 'react'
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import ProductContainer from '../../components/shop/ProductContainer'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import CustomeHaderButton from '../../components/UI/HeaderButton'
import { AntDesign } from '@expo/vector-icons';
import * as productActions from '../../store/actions/productaction'

const UserProductPage = (props) => {


    const dispatch = useDispatch()
    console.log('hello111')
    const userproductdata = useSelector(state => state.products.userProducts)
    const handledelete = (id) => {
        Alert.alert(
            'Are you sure you want to delete the product?',
            '',
            [
                { text: 'No', style: 'default' },
                {
                    text: 'Yes',
                    style: 'destructive',
                    onPress: () => {
                        dispatch(productActions.deleteuseritem(id));
                    },
                },
            ],
        );
    };
    useEffect(() => {
       
        props.navigation.setOptions({

            headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
                    <Item
                        title='menue'
                        iconName='menu'
                        iconSize={30}
                        onPress={() =>
                            props.navigation.openDrawer()
                        } />
                </HeaderButtons>
            ),
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomeHaderButton}>
                    <AntDesign
                        name="pluscircleo"
                        size={24}
                        color="black"
                        onPress={() => {
                            props.navigation.navigate({
                                name: 'Edit Product',
                            })
                        }} />
                    {/* <Item
                        title='plus'
                        iconName='plus'
                        iconSize={30}
                        onPress={() => {
                            props.navigation.navigate({
                                name: 'Edit Product'
                            })
                        }}
                    /> */}
                </HeaderButtons>

            )
        })
    })

    return (
        <View style={styles.mainscreen}>
            <FlatList
                data={userproductdata}
                renderItem={(itemdata) =>
                    <ProductContainer
                        image={itemdata.item.imageUrl}
                        title={itemdata.item.title}
                        price={itemdata.item.price}
                        buttonleft='delete'
                        buttonright='edit'
                        rigthpress={() =>
                            props.navigation.navigate({
                                name: 'Edit Product',
                                params: {
                                    productid: itemdata.item.id
                                }
                            })
                        }
                        leftpress={()=>handledelete(itemdata.item.id)}
                    />} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainscreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default UserProductPage


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const UserProductPage = () => {
//   return (
//     <View>
//       <Text>UserProductPage</Text>
//       <Text>UserProductPage</Text>
//       <Text>UserProductPage</Text>
//       <Text>UserProductPage</Text>
//     </View>
//   )
// }

// export default UserProductPage

// const styles = StyleSheet.create({


// })
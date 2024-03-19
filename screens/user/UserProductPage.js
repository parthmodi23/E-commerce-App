import React from 'react'
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import ProductDetails from '../../components/shop/ProductDetails'
import ProductContainer from '../../components/shop/ProductContainer'

const UserProductPage = (props) => {
    console.log('hello111')
    const userproductdata = useSelector(state => state.products.userProducts)
    console.log("userdata" + JSON.stringify(userproductdata))
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
                    leftpress={() => {}}
                    rightpress={() => {}}
                />}/>
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
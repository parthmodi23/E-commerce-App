import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailspage from "../screens/shop/ProductDetailspage";
import CartPage from "../screens/shop/CartPage";
const Stack = createStackNavigator();

const ProductNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
      <Stack.Screen name='ProductDetailspage' component={ProductDetailspage}/>
      <Stack.Screen name='Your Cart' component={CartPage} />
    </Stack.Navigator>
)

export default ProductNavigator;

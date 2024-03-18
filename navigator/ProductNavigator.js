import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailspage from "../screens/shop/ProductDetailspage";
import CartPage from "../screens/shop/CartPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../screens/shop/OrderScreen";
const Stack = createStackNavigator();
const SideDrawer = createDrawerNavigator();
const ProductNavigator = (props) => (
  <Stack.Navigator>
  <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
  <Stack.Screen name='ProductDetailspage' component={ProductDetailspage}/>
  <Stack.Screen name='Your Cart' component={CartPage} />
 </Stack.Navigator>
)
const SideNavigator=(props)=>(
<SideDrawer.Navigator screenOptions={{headerShown:false}} >
<SideDrawer.Screen name="MainScreen" component={ProductNavigator} />
<SideDrawer.Screen name="order" component={OrderScreen}/>
</SideDrawer.Navigator>
)
export default SideNavigator;

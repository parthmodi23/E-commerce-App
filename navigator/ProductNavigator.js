import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailspage from "../screens/shop/ProductDetailspage";
import CartPage from "../screens/shop/CartPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductPage from "../screens/user/UserProductPage";

const Stack = createStackNavigator();
const SideDrawer = createDrawerNavigator();

const ProductNavigator = () => (
  <Stack.Navigator>
  <Stack.Screen name='ProductOverview' component={ProductOverviewScreen} />
  <Stack.Screen name='ProductDetailspage' component={ProductDetailspage}/>
  <Stack.Screen name='Your Cart' component={CartPage} />
 </Stack.Navigator>
)

const OrderNavigator=()=>(
  <Stack.Navigator>
    <Stack.Screen name='orderscreen' component={OrderScreen} options={{headerShown:false}}/>
  </Stack.Navigator>
)

const Userproduct=()=>(
  //use return insted
  <Stack.Navigator>
    <Stack.Screen name='userproduct' component={UserProductPage} options={{headerShown:false}} />
  </Stack.Navigator>
)
const SideNavigator=()=>(
<SideDrawer.Navigator>
<SideDrawer.Screen name="MainScreen" component={ProductNavigator} options={{headerShown:false}}/>
<SideDrawer.Screen name="Orders" component={OrderNavigator} options={{headerShown:true}}/>
<SideDrawer.Screen name="admin" component={Userproduct} options={{headerShown:true}}/>
</SideDrawer.Navigator>
)
export default SideNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import ProductDetailspage from "../screens/shop/ProductDetailspage";
import CartPage from "../screens/shop/CartPage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import OrderScreen from "../screens/shop/OrderScreen";
import UserProductPage from "../screens/user/UserProductPage";
import EditProductPage from "../screens/user/EditProductPAge";
import AuthScreen from "../screens/user/AuthScreen";

const Stack = createStackNavigator();
const SideDrawer = createDrawerNavigator();

const ProductNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Products' component={ProductOverviewScreen} />
    <Stack.Screen name='ProductDetailspage' component={ProductDetailspage} />
    <Stack.Screen name='Your Cart' component={CartPage} />
  </Stack.Navigator>
)

const OrderNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='orderscreen' component={OrderScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
)

const Userproduct = () => (
  //use return insted ( )
  <Stack.Navigator>
    <Stack.Screen name='Your Products' component={UserProductPage} options={{ headerShown: true }} />
    <Stack.Screen name='Edit Product' component={EditProductPage} options={{ headerShown: true }} />
  </Stack.Navigator>
)
const SideNavigator = () => (
  <SideDrawer.Navigator>
    <SideDrawer.Screen name="MainScreen" component={ProductNavigator} options={{ headerShown: false }} />
    <SideDrawer.Screen name="Orders" component={OrderNavigator} options={{ headerShown: true }} />
    <SideDrawer.Screen name="admin" component={Userproduct} options={{ headerShown: false }} />
  </SideDrawer.Navigator>
)

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login screen" component={AuthScreen} options={{headerShown:false}} />
  </Stack.Navigator>)


const MainNavigator = () => (
  <Stack.Navigator>
            <Stack.Screen name="Login" component={AuthNavigator} />

        <Stack.Screen name="Main" component={SideNavigator} options={{headerShown:false}}/>


  </Stack.Navigator>)


export default MainNavigator;

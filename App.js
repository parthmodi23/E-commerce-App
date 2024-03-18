
import ProductNavigator from './navigator/ProductNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { combineReducers, createStore ,applyMiddleware} from 'redux';
import ProductReducer from './store/reducer/productreducer';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { useFonts } from 'expo-font';
import logger from 'redux-logger';
import cartReducer from './store/reducer/cart'
import * as SplashScreen from 'expo-splash-screen';
import orderReducer from './store/reducer/orders'
import OrderScreen from './screens/shop/OrderScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import CardReducer from './store/reducer/cart'
enableScreens();
SplashScreen.preventAutoHideAsync();

// // Combine reducers
const rootReducer = combineReducers({
  products: ProductReducer,
  cart:cartReducer,
  orders:orderReducer,
});

// Create Redux store
const mystore = createStore(rootReducer, applyMiddleware(logger)); // Apply logger middleware




// App component
export default function App() {

  let [fontLoaded] = useFonts({ 
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'), 
    'DancingScript-VariableFont_wght': require("./assets/fonts/DancingScript-VariableFont_wght.ttf") 
  });
  if (!fontLoaded) {
    return <AppLoading/>
  }

  return (
      // {/* <Provider store={mystore}> */}
      //   {/* <NavigationContainer>
      //   </NavigationContainer> */}
      // {/* </Provider> */}
  <GestureHandlerRootView style={{flex:1}}>
  <NavigationContainer>
  <Provider store={mystore}>
  <ProductNavigator/>
  <OrderScreen/>
  </Provider>
  </NavigationContainer>
  </GestureHandlerRootView>

  );
}
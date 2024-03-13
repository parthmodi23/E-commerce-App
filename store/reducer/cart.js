import { combineTransition } from "react-native-reanimated";
import CartItem from "../../Model/cartItem";

const initialState={
    products:{},
    totalAmount:0
}

export default (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TO_CART' : 
            const addedProduct=action.payload.product;
            const productPrice=addedProduct.price;
            const productTitle=addedProduct.title;
            const productImage=addedProduct.imageUrl
            let updatedorNewCartItem;
            if(state.products[addedProduct.id]){
                //if item is already in the product
                updatedorNewCartItem=new CartItem(
                    state.products[addedProduct.id].quantity+1,
                    productPrice,productTitle,productImage,
                    state.products[addedProduct.id].sum+productPrice
                )
                
            }else{
                updatedorNewCartItem=new CartItem(1,productPrice,productTitle,productImage,productPrice);
            }
            return {
                    ...state,
                    products:{...state.products,[addedProduct.id]:updatedorNewCartItem},
                    totalAmount:state.totalAmount+productPrice
                }
            default:
                return state

            
    }
}
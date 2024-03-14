import CartItem from "../../Model/cartItem";
const initialState={
    products:{},
    totalAmount:0
}

export default (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TO_CART' : 
            const addedProduct=action.payload.product
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
           
        case 'HANDLE_QUANTITY_FROM_CARTPRODUCT' :
            const removeitemid = action.payload.productId
            const selectedproduct = state.products[removeitemid]
            console.log(selectedproduct)
            if(state.products[removeitemid]){
                if(state.products[removeitemid].quantity>1){
                    //if product quantity is greater 1 then just reduce the quntity by one
                    return {
                        ...state,
                        products:{...state.products,[removeitemid]:new CartItem(
                            selectedproduct.quantity-1,
                            selectedproduct.productPrice,
                            selectedproduct.productTitle,
                            selectedproduct.imageUrl,
                            selectedproduct.sum-selectedproduct.productPrice
                        )},
                        totalAmount:state.totalAmount-selectedproduct.productPrice
                    }
                }else{
                    //remove product directly
                    const allproducts={...state.products}
                   delete allproducts[removeitemid]
                    return {
                        ...state,
                        products:allproducts,
                        totalAmount:state.totalAmount-selectedproduct.productPrice
                    }
                }
            }
            case 'REMOVE_ITEM':
                const removeproductid = action.payload.productId
                console.log(removeitemid)
                const productdata=state.products[removeproductid]
                console.log(productdata)

                const allnewproducts={...state.products}
                delete allnewproducts[removeproductid]

                return{
                    ...state,
                    products:allnewproducts,
                    totalAmount:(state.totalAmount-(productdata.quantity*productdata.productPrice))
                }

            default:
                return state

            
    }
}
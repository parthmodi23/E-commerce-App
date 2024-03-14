const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        payload: {
            product: product
        }
    }
}

export const handlequantity = productId=>{
    return{
        type : "HANDLE_QUANTITY_FROM_CARTPRODUCT",
        payload:{
            productId:productId
        }
    }
}

export const removefromcart=productId=>{
    return{
        type:'REMOVE_ITEM',
        payload:{
            productId:productId
        }
    }
}
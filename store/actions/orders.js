export const ADD_ORDER='ADD_ORDER';

export const addOrder=(cartItems,totalAmount)=>{
    return{
        type:ADD_ORDER,
        payload:{
            orderData:{
                items:cartItems,
                amount:totalAmount,
            }
        }
    }
}
import Order from '../../Model/orders' 
const initialstate={
    orders:[]
}

export default (state=initialstate,action)=>{
    switch(action.type){
        case 'ADD_ORDER':
            const newOrder=new Order(
            new Date().toString(),
            action.payload.orderData.items,
            action.payload.orderData.amount,
            new Date());
         return {
        ...state,
        orders:state.orders.concat(newOrder)
        }
    default:
        return state
    }}
   
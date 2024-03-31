import Order from '../../Model/orders' 
const initialstate={
    orders:[],
    userid:null
}

export default (state=initialstate,action)=>{
    switch(action.type){

        case 'SET_PRODUCT':
            return {
                ...state,
                orders:action.payload.products,
                userid:action.payload.userid

            }

        case 'ADD_ORDER':
            const newOrder=new Order(
            action.payload.orderData.id,
            action.payload.orderData.ownerId,
            action.payload.orderData.items,
            action.payload.orderData.amount,
            action.payload.orderData.date
            );
         return {
        ...state,
        orders:state.orders.concat(newOrder),
        userid:action.payload.orderData.ownerId
        }
    default:
        return state
    }}
   
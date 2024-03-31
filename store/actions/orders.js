import Order from "../../Model/orders";
export const ADD_ORDER='ADD_ORDER';
export const SET_PRODUCT='SET_PRODUCT'

export const featchOrder=()=>{
    try{
    return async (dispatch,getdata)=>{
        const token=getdata().auth.token
        const userid=getdata().auth.userid
        const response=await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Orders/${userid}.json?auth=${token}`)
            const resData=await response.json()

            if(!response.ok){
                throw new Error("something went wrong!")
              } 
              
            const loadeddata=[]
            for(const key in resData){
                loadeddata.push(
                    new Order(
                        key,
                        resData[key].localId,
                        resData[key].cartItems,
                        resData[key].totalAmount ,
                        new Date(resData[key].date),
                    )
                )
            }
            dispatch({
                type:'SET_PRODUCT',
                payload:{
                    products:loadeddata,
                    userid:userid
                }
               
            })
        }
    }catch(err){
        throw err
    } 
}
export const addOrder=(cartItems,totalAmount)=>{

    return async (dispatch,getdata) => {
        const token=getdata().auth.token
        const userid=getdata().auth.userid
        const date=new Date()
        const response = await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Orders/${userid}.json?auth=${token}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems,
            totalAmount,
            date:date.toISOString()
          })
          })
          if(!response.ok){
            throw new Error("something went wrong!")
          } 
        
          const resData = await response.json();
        
        dispatch({
            type:ADD_ORDER,
            payload:{
                orderData:{
                    id:resData.name,
                    ownerId:resData.localId,
                    items:cartItems,
                    amount:totalAmount,
                    date:date
                }
            }
        })
}}
   

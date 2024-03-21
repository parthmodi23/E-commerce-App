export const DELETE_PRODUCT='DELETE_PRODUCT';
export const  CREATE_PRODUCT='CREATE_PRODUCT';
export const UPDATE_PRODUCT='UPDATE_PRODUCT';

export const deleteuseritem=(productid)=>{
    console.log(productid)
    return{
        type:'DELETE_PRODUCT',
        payload:{
            productid:productid,
        }
    }

}

export const createproduct=(title,imageUrl,price,description)=>{
    return{
        type:'CREATE_PRODUCT',
        payload:{
            productData:{
                title:title,
                imageUrl:imageUrl,
                price:price,
                description:description
            }
        }
    }
}

export const updateproduct=(id,title,imageUrl,price,description)=>{
    console.log(id)
    return{
        type:'UPDATE_PRODUCT',
        payload:{
            id:id,
            updateddata:{
                title:title,
                imageUrl:imageUrl,
                price:price,
                description:description
            }
        }
    }
}
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
import Product from '../../Model/Product';


export const fetchProducts = () => {
    return async dispatch => {
      try {
        const response = await fetch(
          'https://test-project-273f7-default-rtdb.firebaseio.com/Products.json',

        );
  
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        console.log(resData)
        const loadedProducts = [];

        for (const key in resData) {
          loadedProducts.push(
            new Product(
              key,
              'u1',
              resData[key].title,
              resData[key].imageUrl,
              resData[key].description,
              resData[key].price,
            )
          );
          console.log(loadedProducts)

        }
  
        dispatch({ type: 'SET_PRODUCTS', products: loadedProducts });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };
  

export const deleteuseritem = productId => {
  return { type: 'DELETE_PRODUCT', 
  
  pid: productId };
};
export const createproduct = (title, imageUrl, price, description) => {
    return async dispatch => {
        const response = await fetch('https://test-project-273f7-default-rtdb.firebaseio.com/Products.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                price,
                description,

            })
        })
        const resData = await response.json();
        console.log(resData)
        dispatch({
            type: 'CREATE_PRODUCT', productData: {
                id: resData.name,
                title,
                imageUrl,
                price,
                description,
            }
        })
    }
}
export const updateproduct = (id,title,imageUrl,price,description) => {
return async dispatch=>{

    await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Products/${id}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            imageUrl,
            price,
            description
        })
    })
    // const resData = await response.json();
    // console.log(resData)

       dispatch( 
        {type: 'UPDATE_PRODUCT',
        pid: id,
        productData: {
          title,
          imageUrl,
          price,
          description   ,
        }})

}

};



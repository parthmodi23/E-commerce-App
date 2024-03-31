export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
import Product from '../../Model/Product';



export const fetchProducts = () => {

  return async (dispatch,getState) => {
    console.log(getState)
    const token=getState().auth.token
    const userid=getState().auth.userid
    try {
      const response = await fetch(
        `https://test-project-273f7-default-rtdb.firebaseio.com/Products.json?auth=${token}`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            +resData[key].price,
          )
        );
      }
      dispatch({
     type: 'SET_PRODUCTS', 
      products: loadedProducts ,
      // pid:userid,
      userproduct:loadedProducts.filter(prod=>prod.ownerId===userid)});
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};



export const deleteProduct = productId => {

  return async (dispatch , getState) => {
    const token=getState().auth.token
    const userid=getState().auth.userid
    console.log(token)
    //here use of fetch to not only fetching or get data but but we can also get, post, put, delete any kind of request send
    const response = await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Products/${productId}.json?auth=${token}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (!response.ok) {
      throw new Error('SomeThing went wrong')
    }
    dispatch({ type: 'DELETE_PRODUCT', pid: productId })
  }
}
export const createproduct = (title, imageUrl, price, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userid = getState().auth.userid;

    console.log(token)
    console.log("userid",userid);

    const response = await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Products.json?auth=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description,
        ownerId: userid // Ensure ownerId is set to the current user's ID
      })
    });

    if (!response.ok) {
      throw new Error("Failed to create product!");
    }

    const responseData = await response.json();

    dispatch({
      type: 'CREATE_PRODUCT',
      productData: {
        id: responseData.name,
        ownerId: userid, // Ensure ownerId is set to the current user's ID
        title,
        imageUrl,
        price,
        description,
      }
    });
  };
};;


export const updateproduct = (id,title, imageUrl, price, description) => {
  return async (dispatch,getState) => {


    const token=getState().auth.token
    const userid=getState().auth.userid
    console.log(token)
    console.log("userid",userid);
    const response = await fetch(`https://test-project-273f7-default-rtdb.firebaseio.com/Products/${id}.json?auth=${token}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        imageUrl,
        price,
        description,
        ownerId:userid
      })
      })
      console.log("respons update:-",response.json())
      // const resData = await response.json();
      if(!response.ok){
        throw new Error("something went wrong!")
      }
      dispatch(
      {
        type: 'UPDATE_PRODUCT',
        pid: id,
        productData: {
          title,
          ownerId:userid,
          imageUrl,
          price,
          description,
        }
      }) 
}};



import PRODUCTS from '../../data/dummy-data';
import Product from '../../Model/Product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1' )
};



export default (state = initialState, action) => {
  switch (action.type) {

    case 'SET_PRODUCTS':
      console.log("useproduct",action.userproduct)
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userproduct
      };

    case 'CREATE_PRODUCT':
      console.log(action.productData)
      const newProduct = new Product(
        action.productData.id,
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price,
      );
              
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };


    case 'UPDATE_PRODUCT':
      const updatedUserProducts = state.userProducts.map(product =>
        product.id === action.pid
          ? {
              ...product,
              title: action.productData.title,
              imageUrl:action.productData.imageUrl,
              price:action.productData.price,
              description: action.productData.description
          }
          : product,
          console.log("updated products:-",updatedUserProducts)

      );
      const updatedAvailableProducts = state.availableProducts.map(product =>
        product.id === action.pid
          ? {
              ...product,
              title: action.productData.title,
              imageUrl: action.productData.imageUrl,
              price:action.productData.price,
              description: action.productData.description
            }
          : product
      );
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts
      };
      // const productIndex = state.userProducts.findIndex(
      //   prod => prod.id === action.pid
      // );
      // const updatedProduct = new Product(
      //   action.pid,
      //   state.userProducts[productIndex].ownerId,
      //   action.productData.title,
      //   action.productData.imageUrl,
      //   action.productData.description,
      //   state.userProducts[productIndex].price
      // );
      // const updatedUserProducts = [...state.userProducts];
      // updatedUserProducts[productIndex] = updatedProduct;
      // const availableProductIndex = state.availableProducts.findIndex(
      //   prod => prod.id === action.pid
      // );
      // const updatedAvailableProducts = [...state.availableProducts];
      // updatedAvailableProducts[availableProductIndex] = updatedProduct;
      // return {
      //   ...state,
      //   availableProducts: updatedAvailableProducts,
      //   userProducts: updatedUserProducts
      // };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        ),
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
      };
      
    default:
      return state;
  }
};


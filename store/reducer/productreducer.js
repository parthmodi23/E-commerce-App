import PRODUCTS from '../../data/dummy-data';
import Product from '../../Model/Product';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter(prod => prod.ownerId === 'u1')
      };
    case 'CREATE_PRODUCT':
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct]
      };
    case 'UPDATE_PRODUCT':
      const updatedUserProducts = state.userProducts.map(product =>
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
    case 'DELETE_PRODUCT':
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pid
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pid
        )
      };
    default:
      return state;
  }
};

export default reducer;

import Product from "../../Model/Product";
import PRODUCTS from "../../data/dummy-data";
import { updateproduct } from "../actions/productaction";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      const productIndex = state.userProducts.findIndex(prod => prod.id === action.payload.id);
      console.log(state.userProducts[productIndex].ownerId)

      const updatedProduct = new Product(
        action.payload.id,
        state.userProducts[productIndex].ownerId,
        action.payload.updateddata.title,
        action.payload.updateddata.imageUrl,
        action.payload.updateddata.description,
        state.userProducts[productIndex].price,

      );
      const updatesUserProducts = [...state.userProducts];
      updatesUserProducts[productIndex] = updatedProduct;

      console.log(updatesUserProducts[productIndex])
      const availableProductIndex = state.availableProducts.findIndex(prod => prod.id === action.payload.id);
      const updatedAvailableProducts = [...state.availableProducts];
      
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      
      return {
        ...state,
        userProducts: updatesUserProducts,
        availableProducts: updatedAvailableProducts,
      };
    
    case 'CREATE_PRODUCT':
      const newProduct = new Product(
        new Date().toString(),
        'u1',
        action.payload.productData.title,
        action.payload.productData.imageUrl,
        action.payload.productData.description,
        action.payload.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };

    case 'DELETE_PRODUCT':
      selectedproductid = action.payload.productid
      console.log("user iddddd" + JSON.stringify(selectedproductid))
      return {
        ...state,
        userProducts:state.userProducts.filter(itemdata =>itemdata.id !== selectedproductid),
        availableProducts: state.availableProducts.filter(itemdata=> itemdata.id !== selectedproductid)
      }

    default:
      return state
  }
};



const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = product => {
    return {
        type: ADD_TO_CART,
        payload: {
            product: product
        }
    }
}
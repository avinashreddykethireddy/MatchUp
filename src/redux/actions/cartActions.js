import * as actionTypes from '../constants/cartConstants';

export const upadteCartItems = (products) => {
    return {
        type: actionTypes.UPDATE_CART_ITEMS,
        products
    }
}

export const getCartItems = () => {
    return {
        type: actionTypes.GET_CART_ITEMS
    }
}
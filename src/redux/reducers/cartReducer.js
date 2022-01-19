import * as actionTypes from '../constants/cartConstants';

const initialState = {
    cartProducts: []
}

function cartReducer(state = initialState , action) {
    switch (action.type) {
        case actionTypes.GET_CART_ITEMS : return state;
        case actionTypes.UPDATE_CART_ITEMS : {
             return action.products;
        }
        default : return state
    }
}

export default cartReducer;
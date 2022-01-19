import * as actionTypes from '../constants/userConstants';

const initialState = {
    user : []
}

function userReducer(state = initialState ,action) {
    switch (action.type) {
        case actionTypes.GET_USER : return state;
        case actionTypes.POST_USER : return [action.payload];
        case actionTypes.PUT_USER : return [action.payload];
        case actionTypes.DELETE_USER : return null;
        default : return state;
    }
}

export default userReducer;
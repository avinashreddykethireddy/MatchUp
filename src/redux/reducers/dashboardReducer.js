import * as actionTypes from '../constants/dashboardConstants';

const initialState = {
    dashboardProducts: []
}

function dashboardReducer(state = initialState , action) {
    switch (action.type) {
        case actionTypes.GET_ITEMS : return state;
        case actionTypes.ADD_ITEM : {
            
            if( state.dashboardProducts.indexOf(action.item) === -1) {
                state.dashboardProducts.push(action.item);
            }
            return state;
        }
        default : return state
    }
}

export default dashboardReducer;
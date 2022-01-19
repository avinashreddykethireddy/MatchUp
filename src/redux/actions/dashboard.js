import * as actionTypes from '../constants/dashboardConstants';

export const addItem = (item) => {
    return {
        type: actionTypes.ADD_ITEM,
        item
    }
}

export const getItems = () => {
    return {
        type: actionTypes.GET_ITEMS,
    }
}
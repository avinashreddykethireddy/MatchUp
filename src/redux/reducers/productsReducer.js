import * as actionTypes from '../constants/productConstants';

const initialState = {
	products: []
};

const ProductReducers = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.FETCH_POST_REQUEST : return action.payload;
		case actionTypes.SORT_POSTS_ASC:
			action.payload.sort(function(a, b){ return (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)});
			return [...action.payload]
		case actionTypes.SORT_POSTS_DESC:
			action.payload.sort(function(a, b) {return (a.name < b.name ? 1 : a.name > b.name ? -1 : 0)});
			return [...action.payload]
			case actionTypes.SORT_BY_PRICE:
				action.payload.sort(function(a, b) {return (parseInt(a.price) < parseInt(b.price) ? 1 : parseInt(a.price) > parseInt(b.price) ? -1 : 0)});
				return [...action.payload]
		default:
			return state;
	}
};

export default ProductReducers;
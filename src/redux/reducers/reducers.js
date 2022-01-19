import { combineReducers } from 'redux';
import blogReducer from "./blogReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";
import cartReducer from "./cartReducer";
import dashboardReducer from "./dashboardReducer";

const rootReducer = combineReducers({
    blogReducer: blogReducer,
    productsReducer: productsReducer,
    userReducer: userReducer,
    cartReducer: cartReducer,
    dashboardReducer: dashboardReducer,
});

export default rootReducer;
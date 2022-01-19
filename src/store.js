import Reducers from './redux/reducers/reducers.js'
import {createStore} from 'redux'
import thunk from "redux-thunk";
import { applyMiddleware } from "redux"

const store = createStore(Reducers, applyMiddleware(thunk) && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store
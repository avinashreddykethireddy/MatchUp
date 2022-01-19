import {ADD_FETCHED_DATA  ,SORT_BY_LATEST,SORT_BY_POPULARITY,SORT_BY_OLDEST} from '../constants/blogConstants'

const initialState = {
    blogs:[]
}
  
function blogReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FETCHED_DATA : return action.payload;
        case SORT_BY_LATEST :
            action.payload.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            return [ ...action.payload]
        case SORT_BY_OLDEST :
            action.payload.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            console.log(action.payload)
            action.payload.reverse();
            return [ ...action.payload]
        case SORT_BY_POPULARITY :
            action.payload.sort(function(a,b){
                return b.popularity - a.popularity;
            });
            return [ ...action.payload]
        default:
            return state;
    }
}
  
export default blogReducer
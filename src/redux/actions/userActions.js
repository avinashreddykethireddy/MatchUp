import * as actionTypes from '../constants/userConstants';

export const getUser = () =>{
    return {
        type : actionTypes.GET_USER,
    }
}
export const updateUser = (user) =>{
    return {
        type : actionTypes.PUT_USER,
        payload : user
    }
}
export const postUser = (user) =>{
    return {
        type : actionTypes.POST_USER,
        payload : user
    }
}
export const delteUser = (user) =>{
    return {
        type : actionTypes.DELETE_USER,
        payload : user
    }
}
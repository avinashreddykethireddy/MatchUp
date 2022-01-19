import axios from 'axios';

import {API_URL} from '../Backend_URL';

async function GetUsers(){
   const users = await axios.get(`${API_URL}/users`)
    .then((result) => {return result.data})
    .catch((error) => {
        console.log(error);
    })

    return users;
}

const isuserExists = async (email) => {
    const users = await GetUsers();
    console.log(users);
    let isUser = false;
    for(let i = 0; i < users.length; i++) {
        if(users[i].email === email) {
            console.log(users[i])
            isUser = true;
            return isUser;
        }
    }
    return isUser;
}

export default async function SignUp(user) {
    if(!user.email){
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
    console.log(isuserExists(user.email) === true)
    if(isuserExists(user.email) === true){
        console.log("User already exists")
        return ({status: 401,msg : 'User already exists'});
    } 
    if(user.password !== user.confirmPassword){
        return ({status: 401,msg : 'Password does not match. Please check password entered!'});
    }
    else{
       return await axios.post(`${API_URL}/users`,user)
        .then((response) => { 
            if(response.status === 200 || response.status ===201){
                return ({status: 200,msg : 'User Sucessfully Signed Up',user: user});
            }
            return ({status: 500,msg : 'Internal Server Error'});
        })
        .catch((error) => {
            console.log(error);
            return ({status: 500,msg : 'Internal Server Error'});
        })
    }
}
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
     let isUser = false;
     for(let i = 0; i < users.length; i++) {
         if(users[i].email === email) {
             isUser = true;
             return isUser;
         }
     }

     return isUser;
 }

export default async function Signin(user){
    if(!user.email){
        return ({status: 401,msg : 'Please Enter all input fields!'});
    }
  
    if(!isuserExists(user.email)){
        return ({status: 401,msg : 'User does not exist. Please Sign Up!'}); 
    }
    const users = await GetUsers();

    for(let i = 0; i < users.length; i++) {
        if(users[i].email === user.email && users[i].password === user.password) {
            return ({status: 200,msg : 'User Sucessfully Signed In',user : users[i]});
        }
    }
    return ({status: 401,msg : 'User does not exist. Please Sign Up!'}); 
}

import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function GetCartProducts(userId){
    return await axios.get(`${API_URL}/users/${userId}`).then((response) => {return response.data})
}
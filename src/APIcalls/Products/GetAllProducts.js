import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function GetAllProducts(){
    return await axios.get(`${API_URL}/products`);
}
import axios from 'axios';
import {API_URL} from '../Backend_URL';

export default async function GetProducts(pageId){
    if(pageId === undefined){
    return await axios.get(`${API_URL}/products?_page=1&_limit=12`);
    }
    if(pageId !== undefined){
        return await axios.get(`${API_URL}/products?_page=${parseInt(pageId)}&_limit=12`);
    }
}
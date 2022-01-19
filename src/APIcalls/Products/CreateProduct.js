import axios from 'axios';
import { mockImgProduct } from '../../utils/mockImages';
import {API_URL} from '../Backend_URL';

export default async function CreateBlog(productname,price){
    let today = new Date();
    const product = {
        "cover": mockImgProduct(Math.floor(Math.random() * (24)  + 1)),
        "name": productname,
        "price": price,
        "createdAt" : today,
    }
    if(productname && price) {
        return await axios.post(`${API_URL}/products`,product)
    }
    return null;
}